"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Collection,
  CreateCollectionRequest,
  UpdateCollectionRequest,
} from "@/lib/types";
import Image from "next/image";
import { Plus, X } from "lucide-react";

// Zod schema for form validation
const collectionFormSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(48, "Title must be 48 characters or less"),
  desc: z
    .string()
    .min(1, "Description is required")
    .max(144, "Description must be 144 characters or less"),
  collected: z.number().min(0, "Collected amount must be 0 or greater"),
  target: z.number().min(0, "Target amount must be 0 or greater"),
  alt: z
    .string()
    .min(1, "Alt text is required")
    .max(24, "Alt text must be 24 characters or less"),
  peopleDonate: z.number().min(0, "People donated must be 0 or greater"),
  peopleDonate_title: z.string().min(1, "People donated title is required"),
  days: z.number().min(0, "Days must be 0 or greater"),
  period: z.string().min(1, "Period is required"),
  quantity: z.number().min(0, "Quantity must be 0 or greater"),
  status: z.enum(["active", "closed"]),
  value: z
    .string()
    .min(1, "Value is required")
    .max(48, "Value must be 48 characters or less"),
  importance: z.enum(["urgent", "important", "non-urgent", "permanent"]),
  long_desc: z
    .array(z.string().min(1, "Description section cannot be empty"))
    .min(1, "At least one long description section is required"),
  image: z.instanceof(File).optional(),
});

type CollectionFormData = z.infer<typeof collectionFormSchema>;

interface CollectionFormProps {
  collection?: Collection;
  onSubmit: (data: CreateCollectionRequest | UpdateCollectionRequest) => void;
  onCancel: () => void;
  isLoading?: boolean;
  mode: "create" | "edit";
}

export function CollectionForm({
  collection,
  onSubmit,
  onCancel,
  isLoading = false,
  mode,
}: CollectionFormProps) {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [currentImages, setCurrentImages] = useState<
    { url: string; path: string }[]
  >(collection?.image || []);

  const isEditing = mode === "edit";

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<CollectionFormData>({
    resolver: zodResolver(collectionFormSchema),
    defaultValues: {
      title: collection?.title || "",
      desc: collection?.desc || "",
      collected: collection?.collected ?? 0,
      target: collection?.target ?? 0,
      alt: collection?.alt || "",
      peopleDonate: collection?.peopleDonate ?? 0,
      peopleDonate_title: collection?.peopleDonate_title ?? "donor",
      days: collection?.days ?? 30,
      period: collection?.period ?? "day",
      quantity: collection?.quantity ?? 1,
      status: collection?.status ?? "active",
      value: collection?.value ?? "",
      importance: collection?.importance ?? "important",
      long_desc: collection?.long_desc
        ? [
            collection.long_desc.section1 || "",
            collection.long_desc.section2 || "",
            collection.long_desc.section3 || "",
          ].filter(desc => desc.trim())
        : [""],
      image: undefined,
    },
  });

  const watchedValues = watch();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setSelectedImage(file);
  };

  const removeSelectedImage = () => {
    setSelectedImage(null);
  };

  const removeCurrentImage = (index: number) => {
    setCurrentImages(prev => prev.filter((_, i) => i !== index));
  };

  const addLongDescSection = () => {
    const currentLongDesc = watch("long_desc");
    setValue("long_desc", [...currentLongDesc, ""]);
  };

  const removeLongDescSection = (index: number) => {
    const currentLongDesc = watch("long_desc");
    if (currentLongDesc.length > 1) {
      setValue(
        "long_desc",
        currentLongDesc.filter((_, i) => i !== index)
      );
    }
  };

  const onFormSubmit = (data: CollectionFormData) => {
    const formData = {
      ...data,
      image: selectedImage,
    };

    if (isEditing && collection) {
      const updateData: UpdateCollectionRequest = {
        title: formData.title,
        desc: formData.desc,
        collected: formData.collected,
        target: formData.target,
        alt: formData.alt,
        peopleDonate: formData.peopleDonate,
        peopleDonate_title: formData.peopleDonate_title,
        days: formData.days,
        period: formData.period,
        quantity: formData.quantity,
        status: formData.status,
        value: formData.value,
        importance: formData.importance,
        long_desc: formData.long_desc.filter(desc => desc.trim()),
        ...(selectedImage && { image: selectedImage }),
      };
      onSubmit(updateData);
    } else {
      const createData: CreateCollectionRequest = {
        title: formData.title,
        desc: formData.desc,
        collected: formData.collected,
        target: formData.target,
        alt: formData.alt,
        peopleDonate: formData.peopleDonate,
        peopleDonate_title: formData.peopleDonate_title,
        days: formData.days,
        period: formData.period,
        quantity: formData.quantity,
        status: formData.status,
        value: formData.value,
        importance: formData.importance,
        long_desc: formData.long_desc.filter(desc => desc.trim()),
        image: selectedImage!,
      };
      onSubmit(createData);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onFormSubmit)}
      className="space-y-6 max-h-[80vh] overflow-y-auto p-6"
    >
      {/* Basic Information Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold border-b pb-2">
          Basic Information
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="title">Title * (max 48 chars)</Label>
            <Input
              id="title"
              {...register("title")}
              placeholder="Collection title"
              maxLength={48}
              className={errors.title ? "border-red-500" : ""}
            />
            {errors.title && (
              <p className="text-sm text-red-500 mt-1">
                {errors.title.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="alt">Alt Text * (max 24 chars)</Label>
            <Input
              id="alt"
              {...register("alt")}
              placeholder="Alt text for image"
              maxLength={24}
              className={errors.alt ? "border-red-500" : ""}
            />
            {errors.alt && (
              <p className="text-sm text-red-500 mt-1">{errors.alt.message}</p>
            )}
          </div>
        </div>

        <div>
          <Label htmlFor="desc">Description * (max 144 chars)</Label>
          <Textarea
            id="desc"
            {...register("desc")}
            placeholder="Short description"
            maxLength={144}
            className={errors.desc ? "border-red-500" : ""}
          />
          {errors.desc && (
            <p className="text-sm text-red-500 mt-1">{errors.desc.message}</p>
          )}
        </div>
      </div>

      {/* Financial Information Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold border-b pb-2">
          Financial Information
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="collected">Collected Amount *</Label>
            <Input
              id="collected"
              type="number"
              {...register("collected", { valueAsNumber: true })}
              placeholder="0"
              min="0"
              className={errors.collected ? "border-red-500" : ""}
            />
            {errors.collected && (
              <p className="text-sm text-red-500 mt-1">
                {errors.collected.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="target">Target Amount *</Label>
            <Input
              id="target"
              type="number"
              {...register("target", { valueAsNumber: true })}
              placeholder="0"
              min="0"
              className={errors.target ? "border-red-500" : ""}
            />
            {errors.target && (
              <p className="text-sm text-red-500 mt-1">
                {errors.target.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="peopleDonate">People Donated *</Label>
            <Input
              id="peopleDonate"
              type="number"
              {...register("peopleDonate", { valueAsNumber: true })}
              placeholder="0"
              min="0"
              className={errors.peopleDonate ? "border-red-500" : ""}
            />
            {errors.peopleDonate && (
              <p className="text-sm text-red-500 mt-1">
                {errors.peopleDonate.message}
              </p>
            )}
          </div>
        </div>

        <div>
          <Label htmlFor="peopleDonate_title">People Donated Title *</Label>
          <Select
            value={watchedValues.peopleDonate_title}
            onValueChange={value => setValue("peopleDonate_title", value)}
          >
            <SelectTrigger
              className={errors.peopleDonate_title ? "border-red-500" : ""}
            >
              <SelectValue placeholder="Select people donated title" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="donor">Donor</SelectItem>
              <SelectItem value="donors">Donors</SelectItem>
              <SelectItem value="донор">Донор</SelectItem>
              <SelectItem value="донори">Донори</SelectItem>
              <SelectItem value="донорів">Донорів</SelectItem>
            </SelectContent>
          </Select>
          {errors.peopleDonate_title && (
            <p className="text-sm text-red-500 mt-1">
              {errors.peopleDonate_title.message}
            </p>
          )}
        </div>
      </div>

      {/* Campaign Settings Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold border-b pb-2">
          Campaign Settings
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <Label htmlFor="days">Days</Label>
            <Input
              id="days"
              type="number"
              {...register("days", { valueAsNumber: true })}
              placeholder="30"
              min="0"
              className={errors.days ? "border-red-500" : ""}
            />
            {errors.days && (
              <p className="text-sm text-red-500 mt-1">{errors.days.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="period">Period *</Label>
            <Select
              value={watchedValues.period}
              onValueChange={value => setValue("period", value)}
            >
              <SelectTrigger className={errors.period ? "border-red-500" : ""}>
                <SelectValue placeholder="Select period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="day">Day</SelectItem>
                <SelectItem value="days">Days</SelectItem>
                <SelectItem value="день">День</SelectItem>
                <SelectItem value="дні">Дні</SelectItem>
                <SelectItem value="днів">Днів</SelectItem>
              </SelectContent>
            </Select>
            {errors.period && (
              <p className="text-sm text-red-500 mt-1">
                {errors.period.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="status">Status</Label>
            <Select
              value={watchedValues.status}
              onValueChange={(value: "active" | "closed") =>
                setValue("status", value)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="importance">Importance *</Label>
            <Select
              value={watchedValues.importance}
              onValueChange={(
                value: "urgent" | "important" | "non-urgent" | "permanent"
              ) => setValue("importance", value)}
            >
              <SelectTrigger
                className={errors.importance ? "border-red-500" : ""}
              >
                <SelectValue placeholder="Select importance" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="urgent">Urgent</SelectItem>
                <SelectItem value="important">Important</SelectItem>
                <SelectItem value="non-urgent">Non-urgent</SelectItem>
                <SelectItem value="permanent">Permanent</SelectItem>
              </SelectContent>
            </Select>
            {errors.importance && (
              <p className="text-sm text-red-500 mt-1">
                {errors.importance.message}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="quantity">Quantity</Label>
            <Input
              id="quantity"
              type="number"
              {...register("quantity", { valueAsNumber: true })}
              placeholder="1"
              min="0"
              className={errors.quantity ? "border-red-500" : ""}
            />
            {errors.quantity && (
              <p className="text-sm text-red-500 mt-1">
                {errors.quantity.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="value">Value * (max 48 chars)</Label>
            <Input
              id="value"
              {...register("value")}
              placeholder="Unique tag for same collections across languages"
              maxLength={48}
              className={errors.value ? "border-red-500" : ""}
            />
            {errors.value && (
              <p className="text-sm text-red-500 mt-1">
                {errors.value.message}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Images Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold border-b pb-2">Images</h3>

        <div>
          <Label htmlFor="image">Upload Image {!isEditing && "*"}</Label>
          <Input
            id="image"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className={errors.image ? "border-red-500" : ""}
          />
          {errors.image && (
            <p className="text-sm text-red-500 mt-1">{errors.image.message}</p>
          )}
        </div>

        {/* Display current images when editing */}
        {isEditing && currentImages.length > 0 && (
          <div>
            <p className="text-sm text-gray-600 mb-2">Current images:</p>
            <div className="flex flex-wrap gap-2">
              {currentImages.map((img, index) => (
                <div key={index} className="relative">
                  <Image
                    src={img.url}
                    alt={`Image ${index + 1}`}
                    width={64}
                    height={64}
                    className="object-cover rounded border"
                  />
                  <button
                    type="button"
                    onClick={() => removeCurrentImage(index)}
                    className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 text-xs hover:bg-red-600 flex items-center justify-center"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Display selected new image */}
        {selectedImage && (
          <div>
            <p className="text-sm text-gray-600 mb-2">Selected new image:</p>
            <div className="flex flex-wrap gap-2">
              <div className="relative">
                <Image
                  src={URL.createObjectURL(selectedImage)}
                  alt="Selected image"
                  width={64}
                  height={64}
                  className="object-cover rounded border"
                />
                <button
                  type="button"
                  onClick={removeSelectedImage}
                  className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 text-xs hover:bg-red-600 flex items-center justify-center"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Long Description Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b pb-2">
          <h3 className="text-lg font-semibold">
            Long Description * (min 1 section)
          </h3>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addLongDescSection}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Section
          </Button>
        </div>

        {watchedValues.long_desc.map((desc, index) => (
          <div key={index} className="flex items-start space-x-2">
            <div className="flex-1">
              <Label htmlFor={`long_desc_${index}`}>Section {index + 1}</Label>
              <Textarea
                id={`long_desc_${index}`}
                {...register(`long_desc.${index}`)}
                placeholder={`Section ${index + 1} description`}
                className={errors.long_desc?.[index] ? "border-red-500" : ""}
              />
              {errors.long_desc?.[index] && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.long_desc[index]?.message}
                </p>
              )}
            </div>
            {watchedValues.long_desc.length > 1 && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => removeLongDescSection(index)}
                className="mt-6"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        ))}

        {errors.long_desc && (
          <p className="text-sm text-red-500">{errors.long_desc.message}</p>
        )}
      </div>

      {/* Form Actions */}
      <div className="flex justify-end space-x-3 pt-4 border-t">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading
            ? "Saving..."
            : isEditing
              ? "Update Collection"
              : "Create Collection"}
        </Button>
      </div>
    </form>
  );
}

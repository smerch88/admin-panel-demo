# Admin Panel Demo with API Integration

This project demonstrates a complete API integration setup for an admin panel using Next.js, Axios, and TanStack Query.

## Features

- **httpOnly Cookie Authentication**: Secure token management via server-side cookies
- **Axios Interceptors**: Automatic error handling and redirects
- **TanStack Query**: Efficient data fetching, caching, and state management
- **TypeScript**: Full type safety for all API calls
- **Image Handling**: Utility functions for working with image URLs
- **Modular Architecture**: Organized hooks and types
- **Authentication**: Login, logout, and user management
- **CRUD Operations**: Complete Create, Read, Update, Delete operations for all entities

## API Endpoints Covered

### Authentication (`/auth`)

- `POST /auth/login` - User login
- `POST /auth/logout` - User logout
- `POST /auth/register` - User registration
- `PATCH /auth/users/{userId}` - Update user
- `DELETE /auth/users/{userId}` - Delete user
- `GET /auth/users` - Get all users (admin only)

### Collections (`/collections`)

- `GET /collections/{locale}/{id}` - Get collection
- `PATCH /collections/{locale}/{id}` - Update collection
- `DELETE /collections/{locale}/{id}` - Delete collection
- `GET /collections/{locale}` - Get collections by locale
- `POST /collections/{locale}` - Create collection
- `GET /collections/tags` - Get collection tags

### Reports (`/reports`)

- `PATCH /reports/{id}` - Update report
- `DELETE /reports/{id}` - Delete report
- `GET /reports` - Get all reports
- `POST /reports` - Create report

### Partners (`/partners`)

- `PATCH /partners/{id}` - Update partner
- `DELETE /partners/{id}` - Delete partner
- `GET /partners` - Get all partners
- `POST /partners` - Create partner

### Merch (`/merch`)

- `PATCH /merch/{locale}` - Update merch data
- `GET /merch` - Get merch content

### Teammates (`/teammates`)

- `DELETE /teammates/{id}` - Delete teammate
- `PATCH /teammates/{id}` - Update teammate
- `GET /teammates` - Get all teammates
- `POST /teammates` - Create teammate

## Project Structure

```
src/
├── app/                    # Next.js app router
│   ├── login/             # Login page
│   ├── layout.tsx         # Root layout with providers
│   └── page.tsx           # Main dashboard page
├── components/            # React components
│   ├── ExampleUsage.tsx   # Demo component showing all hooks
│   ├── Navigation.tsx     # Top navigation with user info
│   └── ProtectedRoute.tsx # Route protection component
├── contexts/              # React contexts
│   └── AuthContext.tsx    # Authentication state management
├── hooks/                 # TanStack Query hooks
│   ├── auth/              # Authentication hooks
│   ├── collections/       # Collections management hooks
│   ├── reports/           # Reports management hooks
│   ├── partners/          # Partners management hooks
│   ├── merch/             # Merch management hooks
│   └── teammates/         # Teammates management hooks
├── lib/                   # Core utilities
│   ├── axios.ts           # Axios instance with interceptors
│   ├── types.ts           # TypeScript interfaces
│   ├── utils.ts           # Utility functions
│   └── index.ts           # Re-exports
├── providers/             # React providers
│   └── QueryProvider.tsx  # TanStack Query provider
└── middleware.ts          # Next.js middleware for route protection
```

## Setup

1. **Environment Variables**: Create a `.env.local` file in the root directory:

   ```bash
   NEXT_PUBLIC_API_URL=https://inharmony-v1.h.goit.study/api
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Run Development Server**:

   ```bash
   npm run dev
   ```

4. **Access the Application**:
   - Open http://localhost:5173
   - You'll be redirected to `/login` if not authenticated
   - Use your credentials to log in

## Authentication Flow

1. **Login**: Navigate to `/login` and enter your credentials
2. **Token Storage**: Tokens are automatically stored in httpOnly cookies by the server
3. **Protected Routes**: All routes except `/login` require authentication
4. **Logout**: Use the logout button in the navigation to sign out

5. **Install dependencies**:

   ```bash
   npm install
   ```

6. **Set environment variables**:
   Create a `.env.local` file:

   ```env
   NEXT_PUBLIC_API_URL=http://localhost:3001/api
   ```

7. **Run the development server**:
   ```bash
   npm run dev
   ```

## Code Formatting

This project uses Prettier for code formatting:

- **Format all files**: `npm run format`
- **Check formatting**: `npm run format:check`
- **Lint code**: `npm run lint`

Prettier is configured to work with ESLint to avoid conflicts.

## Usage Examples

### Authentication

```typescript
import { useLogin, useLogout, useUsers } from "@/hooks";

function AuthExample() {
  const login = useLogin();
  const logout = useLogout();
  const { data: users, isLoading } = useUsers();

  const handleLogin = (credentials) => {
    login.mutate(credentials);
  };

  const handleLogout = () => {
    logout.mutate();
  };

  return (
    <div>
      {/* Login form */}
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleLogout}>Logout</button>

      {/* Display users */}
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        users?.map((user) => <div key={user.id}>{user.name}</div>)
      )}
    </div>
  );
}
```

### Collections

```typescript
import {
  useCollections,
  useCreateCollection,
  useUpdateCollection,
} from "@/hooks";

function CollectionsExample() {
  const { data: collections, isLoading } = useCollections("en");
  const createCollection = useCreateCollection();
  const updateCollection = useUpdateCollection();

  const handleCreate = () => {
    createCollection.mutate({
      locale: "en",
      collectionData: {
        title: "New Collection",
        description: "Description",
        tags: ["tag1", "tag2"],
      },
    });
  };

  const handleUpdate = (id: string) => {
    updateCollection.mutate({
      locale: "en",
      id,
      collectionData: {
        title: "Updated Title",
      },
    });
  };

  return (
    <div>
      <button onClick={handleCreate}>Create Collection</button>
      {collections?.map((collection) => (
        <div key={collection.id}>
          <h3>{collection.title}</h3>
          <button onClick={() => handleUpdate(collection.id)}>Update</button>
        </div>
      ))}
    </div>
  );
}
```

### Reports

```typescript
import {
  useReports,
  useCreateReport,
  useUpdateReport,
  useDeleteReport,
} from "@/hooks";

function ReportsExample() {
  const { data: reports, isLoading } = useReports();
  const createReport = useCreateReport();
  const updateReport = useUpdateReport();
  const deleteReport = useDeleteReport();

  const handleCreate = () => {
    createReport.mutate({
      title: "New Report",
      content: "Report content",
      status: "draft",
    });
  };

  const handleUpdate = (id: string) => {
    updateReport.mutate({
      id,
      reportData: { status: "published" },
    });
  };

  const handleDelete = (id: string) => {
    deleteReport.mutate(id);
  };

  return (
    <div>
      <button onClick={handleCreate}>Create Report</button>
      {reports?.map((report) => (
        <div key={report.id}>
          <h3>{report.title}</h3>
          <button onClick={() => handleUpdate(report.id)}>Update</button>
          <button onClick={() => handleDelete(report.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}
```

### Partners

```typescript
import {
  usePartners,
  useCreatePartner,
  useUpdatePartner,
  useDeletePartner,
} from "@/hooks";

function PartnersExample() {
  const { data: partners, isLoading } = usePartners();
  const createPartner = useCreatePartner();
  const updatePartner = useUpdatePartner();
  const deletePartner = useDeletePartner();

  const handleCreate = () => {
    createPartner.mutate({
      name: "New Partner",
      description: "Partner description",
      logo: {
        id: "partner-logo-id",
        path: "partner-logo.jpg",
        alt: "Partner logo",
      },
      website: "https://example.com",
    });
  };

  const handleUpdate = (id: string) => {
    updatePartner.mutate({
      id,
      partnerData: { name: "Updated Partner Name" },
    });
  };

  const handleDelete = (id: string) => {
    deletePartner.mutate(id);
  };

  return (
    <div>
      <button onClick={handleCreate}>Create Partner</button>
      {partners?.map((partner) => (
        <div key={partner.id}>
          <h3>{partner.name}</h3>
          <button onClick={() => handleUpdate(partner.id)}>Update</button>
          <button onClick={() => handleDelete(partner.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}
```

### Teammates

```typescript
import {
  useTeammates,
  useCreateTeammate,
  useUpdateTeammate,
  useDeleteTeammate,
} from "@/hooks";

function TeammatesExample() {
  const { data: teammates, isLoading } = useTeammates();
  const createTeammate = useCreateTeammate();
  const updateTeammate = useUpdateTeammate();
  const deleteTeammate = useDeleteTeammate();

  const handleCreate = () => {
    createTeammate.mutate({
      name: "John Doe",
      position: "Developer",
      bio: "Full-stack developer",
      socialLinks: {
        linkedin: "https://linkedin.com/in/johndoe",
        github: "https://github.com/johndoe",
      },
    });
  };

  const handleUpdate = (id: string) => {
    updateTeammate.mutate({
      id,
      teammateData: { position: "Senior Developer" },
    });
  };

  const handleDelete = (id: string) => {
    deleteTeammate.mutate(id);
  };

  return (
    <div>
      <button onClick={handleCreate}>Add Teammate</button>
      {teammates?.map((teammate) => (
        <div key={teammate.id}>
          <h3>{teammate.name}</h3>
          <p>{teammate.position}</p>
          <button onClick={() => handleUpdate(teammate.id)}>Update</button>
          <button onClick={() => handleDelete(teammate.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}
```

### Merch

```typescript
import { useMerch, useUpdateMerch } from "@/hooks";

function MerchExample() {
  const { data: merch, isLoading } = useMerch();
  const updateMerch = useUpdateMerch();

  const handleUpdate = (locale: string) => {
    updateMerch.mutate({
      locale,
      merchData: {
        buttonText: "Buy Now",
        buttonUrl: "https://shop.example.com",
        isActive: true,
      },
    });
  };

  return (
    <div>
      {merch?.map((item) => (
        <div key={item.locale}>
          <h3>Locale: {item.locale}</h3>
          <p>Button: {item.buttonText}</p>
          <button onClick={() => handleUpdate(item.locale)}>Update</button>
        </div>
      ))}
    </div>
  );
}
```

## Key Features

### Authentication

- **httpOnly Cookie Authentication**: Secure token management via server-side cookies
- **Automatic Token Handling**: No need to manually add Authorization headers
- **Error Handling**: Handles 401 errors by clearing user data and redirecting to login
- **User Role Management**: Support for admin, editor, and user roles

### Image Handling

- **Utility Functions**: `getImageUrl()` and `getImageUrlFromPath()` for working with images
- **Automatic URL Construction**: Combines base URL with image paths
- **Image Objects**: Support for structured image data with id, path, and alt text
- **Base URL**: `https://inharmony-v1.h.goit.study/images/all/`

```typescript
import { getImageUrl, getImageUrlFromPath } from "@/lib/utils";

// From image object
const imageUrl = getImageUrl({
  id: "image-id",
  path: "68b05a329f67cff795d884b9.jpg",
  alt: "Image description",
});

// From path string
const imageUrl = getImageUrlFromPath("68b05a329f67cff795d884b9.jpg");
```

### Axios Interceptor

- **Automatic Error Handling**: Handles 401 errors by clearing user data and redirecting to login
- **Request/Response Interceptors**: Centralized request/response handling

### TanStack Query Configuration

- **Stale Time**: 1 minute for queries
- **Garbage Collection**: 10 minutes for cached data
- **Retry Logic**: 3 retries for 5xx errors, no retries for 4xx errors
- **DevTools**: React Query DevTools included for debugging

### Type Safety

- Complete TypeScript interfaces for all API requests and responses
- Type-safe hooks with proper return types
- IntelliSense support for all API calls

### Cache Management

- Automatic cache invalidation on mutations
- Optimistic updates where appropriate
- Proper cache key management for efficient queries

## Environment Variables

| Variable              | Description            | Default                     |
| --------------------- | ---------------------- | --------------------------- |
| `NEXT_PUBLIC_API_URL` | Base URL for API calls | `http://localhost:3001/api` |

## Development

The project includes:

- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **ESLint** for code quality
- **React Query DevTools** for debugging API calls

## Contributing

1. Follow the existing code structure
2. Add proper TypeScript types for new endpoints
3. Create separate hook files for new API modules
4. Update the index files to export new functions
5. Add examples to the ExampleUsage component

## License

MIT

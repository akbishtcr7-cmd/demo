# Backend Deployment Notes

## Render Settings

Root Directory:

```text
backend
```

Build Command:

```text
npm install
```

Start Command:

```text
npm start
```

## Required Environment Variables

```env
NODE_ENV=production
FRONTEND_URL=https://your-vercel-frontend.vercel.app
MONGO_URI=your_mongodb_atlas_uri_with_encoded_password
JWT_SECRET=your_strong_jwt_secret
JWT_EXPIRES_IN=7d
OTP_EXPIRES_IN_MINUTES=10
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

## Optional SMTP Variables

The backend starts even if these values are missing. Register and login OTP routes return
a 503 response until email is configured.

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_16_digit_gmail_app_password_without_spaces
SMTP_FROM=Auth App <your_email@gmail.com>
```

## MongoDB Password Encoding

If your MongoDB password contains special characters like `@ # $ % : / ? & =`, encode
the password before using it in `MONGO_URI`.

```text
Original password: my@pass#123
Encoded password:  my%40pass%23123
```

```env
MONGO_URI=mongodb+srv://username:encodedPassword@cluster.mongodb.net/dbname?retryWrites=true&w=majority
```

## Deployment Test Steps

1. Deploy the backend on Render with the required variables.
2. Open `https://your-render-backend.onrender.com/api/health`.
3. Confirm the response has `success: true`, `message: "Backend is running"`, and an `emailService` value.
4. If SMTP is missing, register/login OTP requests should return HTTP 503 with a clean message instead of crashing the backend.
5. Add valid SMTP variables, redeploy, and test register/login OTP email delivery again.

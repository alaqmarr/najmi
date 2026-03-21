import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized: ({ req, token }) => {
      if (req.nextUrl.pathname.startsWith("/admin")) {
        return token?.role === "admin";
      }
      return true;
    },
  },
  pages: {
    signIn: "/admin/login",
  },
});

export const config = { matcher: ["/admin/:path*"] };

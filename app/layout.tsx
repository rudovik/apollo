import { ApolloWrapper } from "lib/apolloWrapper"

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <ApolloWrapper>
        <body>{children}</body>
      </ApolloWrapper>
    </html>
  )
}

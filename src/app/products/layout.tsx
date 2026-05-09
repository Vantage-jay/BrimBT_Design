/* ============================================================
   BrinmBT Design — Products Route Layout
   File: src/app/products/layout.tsx
   This server component prevents client/server conflicts
   on the /products route during static generation.
   ============================================================ */

export const dynamic = 'force-dynamic'

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

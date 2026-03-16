import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import Image from "next/image";

export default function ProductDetailsPage() {
  return (
    <>
      {/* breadcum */}
      <Breadcrumb className="my-4">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="#">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="#">Smartphone</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="#">Apple</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="#">iPhone 17 series</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>iPhone 17 Pro 256Gb</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* product details */}
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2">
          <h3 className="font-semibold mb-2">iPhone 17 Pro 256GB</h3>
          <div>
            <div className="flex gap-2 items-center text-sm">
              <Star
                className="w-4 h-4 text-yellow-300"
                fill="oklch(90.5% 0.182 98.111)"
              />{" "}
              4.9
            </div>
          </div>

          <Image
            src="/images/smartphones/iphone-17-pro-256-gb.webp"
            width="300"
            height="300"
            alt="Product 1"
          />
        </div>
        <div>
          <div className="font-semibold">Pricing</div>
          <div className="text-red-500 text-2xl font-semibold">34.390.000đ</div>
          <div className="text-muted-foreground text-lg line-through">
            34.390.000đ
          </div>
          <div className="flex gap-2 mt-4">
            <Button>Buy now</Button>
            <Button variant="outline">Add to card</Button>
          </div>
        </div>
      </div>

      {/* Technical specifications */}
      <div className="my-4">
        <h3 className="text-center mb-4 font-semibold">
          Technical specifications
        </h3>

        {[
          { key: "Kích thước màn hình", value: "6.3 inches" },
          { key: "Công nghệ màn hình", value: "Super Retina XDR" },
          {
            key: "Camera sau",
            value: `
              Chính: 48MP khẩu độ ƒ/1.6 OIS hỗ trợ chụp 24MP hoặc 48MP. 
              Góc Siêu Rộng: 48MP khẩu độ ƒ/2.2 góc nhìn 120°.
              Telephoto: 48MP khẩu độ ƒ/2.8 OIS zoom quang học lên đến 8x
            `,
          },
          {
            key: "Camera trước",
            value: "Camera 18MP Center Stage Khẩu độ ƒ/1.9",
          },
          { key: "Chipset", value: "Chip A19 Pro" },
          { key: "Công nghệ NFC", value: "Có" },
          { key: "Bộ nhớ trong", value: "256 GB" },
          {
            key: "Thẻ SIM",
            value: "Sim kép (nano-Sim và e-Sim) - Hỗ trợ 2 e-Sim",
          },
          { key: "Hệ điều hành", value: "iOS 26" },
          { key: "Độ phân giải màn hình", value: "2622 x 1206 pixels" },
          {
            key: "Tính năng màn hình",
            value: `Màn hình Luôn Bật, ProMotion 120Hz, HDR, True Tone, Dải màu rộng (P3), Haptic Touch, Tỷ lệ tương phản 2.000.000:1, Độ sáng 1000 nit (tiêu chuẩn), 1600 nit (HDR), 3000 nit (ngoài trời) / tối thiểu 1 nit, Lớp phủ kháng dầu, Chống phản chiếu, Hỗ trợ đa ngôn`,
          },
          {
            key: "Loại CPU",
            value: "CPU 6 lõi với 2 lõi hiệu năng và 4 lõi tiết kiệm điện",
          },
        ].map((item, index) => (
          <div className="grid grid-cols-3" key={index}>
            <div className="col-span-1 border p-2">{item.key}</div>
            <div className="col-span-2 border p-2">{item.value}</div>
          </div>
        ))}
      </div>

      {/* description */}
      <div
        className="prose max-w-none ProseMirror"
        dangerouslySetInnerHTML={{
          __html: `
            <h1 style=\"text-align: center;\"><strong>Hello</strong></h1><img src=\"https://res.cloudinary.com/tiendeptrai/image/upload/v1773332090/cyberphone/products/nlmej9jisgtmtlrslokc.webp\" data-align=\"left\" class=\"image-left\"><img src=\"https://res.cloudinary.com/tiendeptrai/image/upload/v1773332090/cyberphone/products/nlmej9jisgtmtlrslokc.webp\" width=\"163\" height=\"163\" data-align=\"center\" class=\"image-center\"><p></p>
          `,
        }}
      />

      {/* related products */}
    </>
  );
}

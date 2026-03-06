"use client";

import { useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { CircleCheckBig } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";

export default function CheckoutResultPage() {
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!searchParams) return;

    const query: Record<string, string> = {};
    searchParams.forEach((value, key) => {
      query[key] = value;
    });

    let provider = "";
    if ("partnerCode" in query && "orderId" in query) {
      provider = "momo";
    } else if ("apptransid" in query || "zptransid" in query) {
      provider = "zalopay";
    }

    if (provider) {
      const params = new URLSearchParams(query).toString();

      fetch(`http://localhost:8080/api/payment/${provider}/return?${params}`, {
        method: "GET",
      }).catch((err) => console.error("Payment verify failed", err));
    }
  }, [searchParams]);

  return (
    <Card>
      <CardContent className="text-center">
        <CircleCheckBig
          size={64}
          className="text-green-500 mx-auto mt-4 mb-8"
        />

        <div className="mb-4">
          <h1 className="font-bold text-2xl mb-3">Payment successful!</h1>
          <p>Thank you for shopping at CyberPhone</p>
        </div>

        <div className="mb-4">
          <div className="p-4 bg-gray-200 w-75 mx-auto rounded-lg">
            <div className="mb-1">Order number</div>
            <div className="font-bold text-lg">
              {searchParams.get("orderId") || "CP-XXXX-XXXX"}
            </div>
          </div>
        </div>

        <Button>
          <Link href="/">Continue shopping</Link>
        </Button>
      </CardContent>
    </Card>
  );
}

"use client";

import { useMemo } from "react";
import { usePathname } from "next/navigation";

interface CheckoutStepIndicatorItemProps {
  stepNumber: number;
  title: string;
  pathname: string;
  hideLine?: boolean;
}

function CheckoutStepIndicatorItem({
  stepNumber,
  title,
  pathname,
  hideLine,
}: CheckoutStepIndicatorItemProps) {
  const currentPath = usePathname();
  const isActive = useMemo(
    () => currentPath === pathname,
    [currentPath, pathname],
  );

  return (
    <>
      <div className="flex items-center gap-2">
        <div
          className={`
            w-8 h-8 rounded-full ${isActive ? "bg-[hsl(222.2,47.4%,11.2%)] text-white" : "bg-[hsl(214.3,31.8%,91.4%)]"} 
            flex items-center justify-center text-sm font-medium
          `}
        >
          {stepNumber}
        </div>
        <span className="hidden sm:inline text-sm font-medium">{title}</span>
      </div>

      {!hideLine && (
        <div className="w-8 sm:w-16 h-px bg-[hsl(214.3,31.8%,91.4%)]"></div>
      )}
    </>
  );
}

const checkoutSteps = [
  {
    stepNumber: 1,
    title: "Review cart",
    pathname: "/checkout/cart",
  },
  {
    stepNumber: 2,
    title: "Customer information",
    pathname: "/checkout/address",
  },
  {
    stepNumber: 3,
    title: "Payment method",
    pathname: "/checkout/payment",
  },
  {
    stepNumber: 4,
    title: "Result",
    pathname: "/checkout/result",
  },
];

export function CheckoutStepIndicator() {
  return (
    <div className="flex items-center justify-center gap-2 sm:gap-4 pt-4 pb-8">
      {checkoutSteps.map((step) => (
        <CheckoutStepIndicatorItem
          key={step.stepNumber}
          stepNumber={step.stepNumber}
          title={step.title}
          pathname={step.pathname}
          hideLine={checkoutSteps.length === step.stepNumber}
        />
      ))}
    </div>
  );
}

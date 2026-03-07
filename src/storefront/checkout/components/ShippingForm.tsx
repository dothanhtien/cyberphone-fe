"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { Contact } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { RequiredFieldLabel } from "@/components/RequiredFieldLabel";
import { AddressFormValues, addressSchema } from "../schemas";
import { Address } from "../types";

interface ShippingFormProps {
  address: Address | undefined;
  onSubmit: (values: AddressFormValues) => void;
}

export function ShippingForm({ address, onSubmit }: ShippingFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddressFormValues>({
    resolver: zodResolver(addressSchema),
    mode: "all",
    defaultValues: address,
  });

  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle className="font-semibold flex items-center gap-2">
          <Contact size={16} /> <span>Customer information</span>
        </CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 gap-4 mb-2">
            <Field>
              <RequiredFieldLabel>First name</RequiredFieldLabel>
              <Input
                {...register("firstName")}
                aria-invalid={!!errors.firstName}
              />
              {errors.firstName && (
                <p className="text-sm text-red-500">
                  {errors.firstName.message}
                </p>
              )}
            </Field>

            <Field>
              <RequiredFieldLabel>Last name</RequiredFieldLabel>
              <Input
                {...register("lastName")}
                aria-invalid={!!errors.lastName}
              />
              {errors.lastName && (
                <p className="text-sm text-red-500">
                  {errors.lastName.message}
                </p>
              )}
            </Field>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-3">
            <Field>
              <RequiredFieldLabel>Phone number</RequiredFieldLabel>
              <Input {...register("phone")} aria-invalid={!!errors.phone} />
              {errors.phone && (
                <p className="text-sm text-red-500">{errors.phone.message}</p>
              )}
            </Field>

            <Field>
              <FieldLabel>Email address</FieldLabel>
              <Input {...register("email")} aria-invalid={!!errors.email} />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </Field>
          </div>

          <Field className="mb-3">
            <RequiredFieldLabel>Address</RequiredFieldLabel>
            <Input {...register("line1")} aria-invalid={!!errors.line1} />
            {errors.line1 && (
              <p className="text-sm text-red-500">{errors.line1.message}</p>
            )}
          </Field>

          <div className="grid grid-cols-3 gap-4 mb-3">
            <Field>
              <RequiredFieldLabel>Ward</RequiredFieldLabel>
              <Input {...register("ward")} aria-invalid={!!errors.ward} />
              {errors.ward && (
                <p className="text-sm text-red-500">{errors.ward.message}</p>
              )}
            </Field>

            <Field>
              <RequiredFieldLabel>District</RequiredFieldLabel>
              <Input
                {...register("district")}
                aria-invalid={!!errors.district}
              />
              {errors.district && (
                <p className="text-sm text-red-500">
                  {errors.district.message}
                </p>
              )}
            </Field>

            <Field>
              <RequiredFieldLabel>City</RequiredFieldLabel>
              <Input {...register("city")} aria-invalid={!!errors.city} />
              {errors.city && (
                <p className="text-sm text-red-500">{errors.city.message}</p>
              )}
            </Field>

            <Field>
              <FieldLabel>Postcode</FieldLabel>
              <Input {...register("postalCode")} />
            </Field>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-3">
            <Button variant="outline" asChild>
              <Link href="/checkout/cart">Back</Link>
            </Button>
            <Button type="submit">Continue</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

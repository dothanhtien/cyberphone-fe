"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { Trash } from "lucide-react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ErrorCard } from "@/components/ErrorCard";
import { PageHeading } from "@/components/PageHeading";
import { PageLoading } from "@/components/PageLoading";
import { CustomerEditForm } from "@/features/customers/components/CustomerEditForm";
import { useCustomerDetails } from "@/features/customers/queries";
import { useDeactivateCustomer } from "@/features/customers/mutations";
import { usePageLayout } from "@/hooks";
import { formatDateTime } from "@/utils";

export default function CustomerDetailsPage() {
  const { id: customerId } = useParams<{ id: string }>();
  const router = useRouter();

  const customerQuery = useCustomerDetails(customerId);
  const customer = customerQuery.data;

  const deactivateCustomerMutation = useDeactivateCustomer();

  usePageLayout({
    segmentLabel: customer ? `${customer.firstName} ${customer.lastName}` : "",
  });

  useEffect(() => {
    if (!customerQuery.isPending && customerQuery.isError) {
      toast.error("Customer not found");
      router.push("/admin/customers");
    }
  }, [customerQuery.isPending, customerQuery.isError, router]);

  const handleDeactivate = () => {
    deactivateCustomerMutation.mutate(customerId, {
      onSuccess: () => {
        toast.success("Customer deactivated successfully");
        router.push("/admin/customers");
      },
      onError: () =>
        toast.error("An error occurred when deactivating customer"),
    });
  };

  if (customerQuery.isPending) {
    return <PageLoading />;
  }

  if (customerQuery.isError || !customer) {
    return <ErrorCard title="Customer not found. Please try again." />;
  }

  return (
    <div className="max-w-230 space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-start">
        <div>
          <PageHeading className="mb-1">
            {customer!.firstName} {customer!.lastName}
          </PageHeading>
          <p className="text-muted-foreground text-sm">{customer!.email}</p>
        </div>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="destructive" size="lg">
              <Trash className="mr-2 h-4 w-4" />
              Deactivate
            </Button>
          </PopoverTrigger>

          <PopoverContent align="end" className="flex flex-col gap-2">
            <div>Are you sure you want to deactivate this customer?</div>

            <div className="flex justify-end gap-2">
              <Button
                variant="destructive"
                size="sm"
                disabled={deactivateCustomerMutation.isPending}
                onClick={handleDeactivate}
              >
                Confirm
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Account Info</CardTitle>
        </CardHeader>

        <CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-2 text-sm">
          <div>
            <p className="text-muted-foreground mb-1">Status</p>
            {customer!.isActive ? (
              <Badge className="bg-green-50 text-green-700">Active</Badge>
            ) : (
              <Badge className="bg-red-50 text-red-700">Inactive</Badge>
            )}
          </div>

          <div>
            <p className="text-muted-foreground mb-1">Email Verified</p>
            {customer!.emailVerified ? (
              <Badge className="bg-green-50 text-green-700">Verified</Badge>
            ) : (
              <Badge variant="secondary">Not Verified</Badge>
            )}
          </div>

          <div>
            <p className="text-muted-foreground mb-1">Phone Verified</p>
            {customer!.phoneVerified ? (
              <Badge className="bg-green-50 text-green-700">Verified</Badge>
            ) : (
              <Badge variant="secondary">Not Verified</Badge>
            )}
          </div>

          <div>
            <p className="text-muted-foreground mb-1">Last Login</p>
            <span>{formatDateTime(customer!.lastLogin ?? undefined)}</span>
          </div>

          <div>
            <p className="text-muted-foreground mb-1">Member Since</p>
            <span>{formatDateTime(customer!.createdAt)}</span>
          </div>

          <div>
            <p className="text-muted-foreground mb-1">ID</p>
            <span className="font-mono text-xs break-all">{customer!.id}</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Edit Details</CardTitle>
        </CardHeader>

        <CardContent>
          <CustomerEditForm customer={customer!} />
        </CardContent>
      </Card>
    </div>
  );
}

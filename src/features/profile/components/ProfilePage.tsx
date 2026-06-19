"use client";

import { useState } from "react";
import { CalendarDays, Clock, Mail, Pencil } from "lucide-react";

import { useProfile } from "../queries";
import { ProfileForm } from "./ProfileForm";
import { ProfileSkeleton } from "./ProfileSkeleton";
import { ErrorCard } from "@/components/ErrorCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { usePageLayout } from "@/hooks";
import { formatDateTime } from "@/utils";

function getInitials(firstName: string, lastName: string) {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
}

export function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const profileQuery = useProfile();
  const profile = profileQuery.data;

  usePageLayout({ segmentLabel: "Profile" });

  if (profileQuery.isPending) {
    return <ProfileSkeleton />;
  }

  if (profileQuery.isError || !profile) {
    return <ErrorCard title="Failed to load profile. Please try again." />;
  }

  return (
    <div className="max-w-230 space-y-6">
      <Card className="overflow-hidden">
        <div className="h-24 bg-linear-to-r from-primary/20 via-primary/10 to-transparent" />
        <CardContent className="pt-0 pb-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:gap-6 -mt-10">
            <div className="shrink-0">
              <div className="h-20 w-20 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-2xl font-bold ring-4 ring-background shadow-md select-none">
                {getInitials(profile.firstName, profile.lastName)}
              </div>
            </div>

            <div className="flex flex-1 flex-col gap-2 sm:flex-row sm:items-end sm:justify-between pb-1 min-w-0">
              <div className="min-w-0">
                <h1 className="text-2xl font-bold leading-tight truncate">
                  {profile.firstName} {profile.lastName}
                </h1>

                <p className="text-muted-foreground text-sm truncate">
                  {profile.email}
                </p>
              </div>

              <div className="flex flex-wrap gap-2 shrink-0">
                {profile.isActive ? (
                  <Badge className="bg-green-50 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-400 dark:border-green-800">
                    Active
                  </Badge>
                ) : (
                  <Badge className="bg-red-50 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-400 dark:border-red-800">
                    Inactive
                  </Badge>
                )}
                {profile.emailVerified ? (
                  <Badge className="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-400 dark:border-blue-800">
                    Email Verified
                  </Badge>
                ) : (
                  <Badge variant="secondary">Email Unverified</Badge>
                )}
                {profile.phoneVerified ? (
                  <Badge className="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-400 dark:border-blue-800">
                    Phone Verified
                  </Badge>
                ) : (
                  <Badge variant="secondary">Phone Unverified</Badge>
                )}
              </div>
            </div>
          </div>

          <Separator className="mt-5 mb-4" />
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="flex items-start gap-2">
              <Clock className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
              <div>
                <p className="text-muted-foreground text-xs">Last Login</p>
                <p className="font-medium text-xs mt-0.5">
                  {formatDateTime(profile.lastLogin ?? undefined)}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <CalendarDays className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
              <div>
                <p className="text-muted-foreground text-xs">Member Since</p>
                <p className="font-medium text-xs mt-0.5">
                  {formatDateTime(profile.createdAt)}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-muted">
              <Mail className="h-4 w-4 text-muted-foreground" />
            </div>

            <div>
              <CardTitle className="text-sm">Profile Details</CardTitle>
              <CardDescription className="text-xs">
                Update your personal information
              </CardDescription>
            </div>
          </div>
          {!isEditing && (
            <CardAction>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsEditing(true)}
              >
                <Pencil className="mr-2 h-4 w-4" />
                Edit
              </Button>
            </CardAction>
          )}
        </CardHeader>

        <CardContent>
          <ProfileForm
            profile={profile}
            isEditing={isEditing}
            onEditingChange={setIsEditing}
          />
        </CardContent>
      </Card>
    </div>
  );
}

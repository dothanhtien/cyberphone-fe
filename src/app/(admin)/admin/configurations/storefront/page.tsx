"use client";

import { PageHeading } from "@/components/PageHeading";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SliderConfiguration } from "@/features/configurations/components/storefront/SliderConfiguration";
import { usePageLayout } from "@/hooks";

export default function AdminStorefrontConfigurations() {
  usePageLayout();

  return (
    <div className="max-w-230">
      <div className="mb-6">
        <PageHeading>Storefront Configurations</PageHeading>
      </div>

      <Tabs defaultValue="sliders">
        <TabsList variant="line">
          <TabsTrigger value="sliders">Sliders</TabsTrigger>
        </TabsList>

        <TabsContent value="sliders">
          <SliderConfiguration />
        </TabsContent>
      </Tabs>
    </div>
  );
}

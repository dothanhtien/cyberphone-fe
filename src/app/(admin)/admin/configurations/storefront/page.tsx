"use client";

import { PageHeading } from "@/components/PageHeading";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CategoriesPanelConfiguration } from "@/features/configurations/components/storefront/CategoriesPanelConfiguration";
import { ProductSectionsConfiguration } from "@/features/configurations/components/storefront/ProductSectionsConfiguration";
import { SliderConfiguration } from "@/features/configurations/components/storefront/SliderConfiguration";
import { usePageLayout } from "@/hooks";

export default function AdminStorefrontConfigurations() {
  usePageLayout();

  return (
    <div className="max-w-230">
      <div className="mb-6">
        <PageHeading>Storefront Configurations</PageHeading>
      </div>

      <Tabs defaultValue="categories-panel">
        <TabsList variant="line">
          <TabsTrigger value="categories-panel">Categories panel</TabsTrigger>
          <TabsTrigger value="sliders">Sliders</TabsTrigger>
          <TabsTrigger value="product-sections">Product sections</TabsTrigger>
        </TabsList>

        <TabsContent value="categories-panel">
          <CategoriesPanelConfiguration />
        </TabsContent>

        <TabsContent value="sliders">
          <SliderConfiguration />
        </TabsContent>

        <TabsContent value="product-sections">
          <ProductSectionsConfiguration />
        </TabsContent>
      </Tabs>
    </div>
  );
}

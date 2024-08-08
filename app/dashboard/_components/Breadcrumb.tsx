"use client";
import React, { Fragment } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";

function BreadcrumbComponent() {
  const paths: string = usePathname();
  const initialPathNames: string[] = paths
    .split("/")
    .filter((path: string) => path);
  const pathNames: string[] = [];

  for (let i = 0; i < initialPathNames.length; i++) {
    const currentPath = initialPathNames[i];
    if (currentPath === "account" || currentPath === "book") {
      pathNames.push(currentPath);
      i++;
    } else {
      pathNames.push(currentPath);
    }
  }

  return (
    <Breadcrumb className="lg:block ml-6 lg:ml-0">
      <BreadcrumbList>
        {pathNames.map((link: string, index: number) => {
          const href: string = `/${pathNames.slice(0, index + 1).join("/")}`;
          const linkName: string =
            link[0].toUpperCase() + link.slice(1, link.length);
          const isLast: boolean = pathNames.length === index + 1;
          return (
            <Fragment key={index}>
              <BreadcrumbItem>
                {!isLast ? (
                  <BreadcrumbLink href={href}>{linkName}</BreadcrumbLink>
                ) : (
                  <BreadcrumbPage className="font-semibold">{linkName}</BreadcrumbPage>
                )}
              </BreadcrumbItem>
              {pathNames.length !== index + 1 && <BreadcrumbSeparator />}
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export default BreadcrumbComponent;
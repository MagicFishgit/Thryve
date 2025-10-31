"use client"

import React, { useEffect, useState } from 'react'
import { DataTable } from './features/data-table'
import { columns } from './features/columns'
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import axiosInstance from '@/lib/axios'

const Page = () => {
const [categories, setCategories] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
  axiosInstance
    .get("/api/categories")
    .then((response) => {
      // --- START DEBUG ---
      console.log("API Response:", response.data);
      console.log("Categories received count:", response.data.data ? response.data.data.length : 0);
      // --- END DEBUG ---

      const apiData = response.data.data.map((item) => ({
        id: item.id,
        name: item.name,
        description: item.description,
        documentId: item.documentId,
      }));
      setCategories(apiData);
    })
    .catch((error) => {
      console.error("Error fetching categories:", error);
    })
    .finally(() => setLoading(false));
}, []);

  return (
    <div className="py-4 md:py-6 px-4 lg:py-6">
      <Card className={"@container/card"}>
        <CardHeader>
          <CardTitle>Categories</CardTitle>
          <CardDescription>
            <span>Manage your categories</span>
            </CardDescription>

            <CardAction>
              <Button>Add Category</Button>
            </CardAction>
        </CardHeader>

        <CardContent>
          {loading ? <p className="text-muted-foreground">Loading...</p> : <DataTable columns={columns} data={categories} />}
        </CardContent>
      </Card>
    </div>
  )
}

export default Page
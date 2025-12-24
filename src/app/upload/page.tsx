"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0] ?? null;
    setFile(f);
    setError(null);
  }

  async function handleUpload() {
    if (!file) {
      setError("Please select a file to upload.");
      return;
    }

    setUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Upload failed");
      }

      const data = await res.json();
      alert(`Uploaded successfully: ${data.name}`);

      setFile(null);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-50 py-12 px-4 dark:bg-slate-950">
      <div className="w-full max-w-lg space-y-6">
        <h1 className="text-2xl font-semibold">Upload File</h1>

        <div className="rounded-xl bg-white/80 dark:bg-slate-900/60 border shadow-sm p-6 space-y-5">
          <label className="block text-sm font-medium text-muted-foreground">
            Select file
          </label>

          <div className="rounded-md border border-dashed border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/40 min-h-[140px] flex items-center justify-center">
            <input
              type="file"
              onChange={onFileChange}
              className="block w-full text-sm text-slate-700 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-primary/10 file:text-primary"
            />
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <Button
              onClick={handleUpload}
              disabled={uploading}
              className="flex-1 h-11 font-medium"
            >
              {uploading ? "Uploading..." : "Upload"}
            </Button>

            <p className="text-sm text-muted-foreground">
              Picked: {file ? file.name : "None"}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

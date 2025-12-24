"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files && e.target.files[0];
    setFile(f ?? null);
  }

  async function handleUpload() {
    if (!file) {
      alert("Please select a file to upload.");
      return;
    }

    setUploading(true);
    try {
      // Placeholder - replace with real upload logic (e.g., fetch to API route)
      await new Promise((r) => setTimeout(r, 800));
      alert(`Uploaded: ${file.name}`);
      setFile(null);
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    } finally {
      setUploading(false);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-50 py-12 px-4 dark:bg-slate-950">
      <div className="w-full max-w-lg space-y-8">
        <h1 className="text-2xl font-semibold">Upload File</h1>

        <div className="rounded-xl bg-white/80 dark:bg-slate-900/60 border shadow-sm">
          <label className="block mb-4 text-sm font-medium text-muted-foreground pt-3">
            Select file
          </label>

          <div className="flex flex-col gap-5">
            <div className="p-6 rounded-md border border-dashed border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/40 min-h-[140px] flex items-center justify-center">
              <input
                type="file"
                onChange={onFileChange}
                className="block w-full text-sm text-slate-700 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-primary/10 file:text-primary"
              />
            </div>

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
      </div>
    </main>
  );
}

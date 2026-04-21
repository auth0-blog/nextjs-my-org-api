"use client";

import { useState, useRef, useEffect } from "react";
import { PAGE_BACKGROUND_COLOR, PRIMARY_COLOR } from "@/lib/org-utils";


export default function OrgSettingsForm() {

  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [saveError, setSaveError] = useState(false);

  // Save settings
  const handleSave = async () => {
    // implement save feature.

  };

  return (
    <form onSubmit={handleSave} noValidate={false}>
      <div className="grid grid-cols-2 gap-x-6 gap-y-5">
        <div className="flex flex-col gap-2">
          <label htmlFor="org-name" className="text-[0.8rem] font-semibold text-text-dim uppercase tracking-[0.5px]">Organization Name</label>
          <input
            id="org-name"
            type="text"
            className="form-input"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="display_name" className="text-[0.8rem] font-semibold text-text-dim uppercase tracking-[0.5px]">
            Organization Display Name
          </label>
          <input
            id="display_name"
            type="text"
            className="form-input"
            placeholder="Enter display name"
          />
        </div>

        <div className="flex flex-col gap-2 col-span-full">
          <label className="text-[0.8rem] font-semibold text-text-dim uppercase tracking-[0.5px]">Organization Logo</label>
          <div className="logo-preview" style={{ backgroundColor: "white" }}>
              <div className="flex flex-col items-center gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://cdn.auth0.com/manhattan/versions/1.7204.0/assets/badge.png"
                  alt="Default logo"
                  className="w-12 h-12"
                />
                <p className="text-text-muted text-[0.85rem] font-medium m-0">default logo has been used</p>
              </div>
          </div>
        </div>

        <div className="flex flex-col gap-2 col-span-full">
          <label htmlFor="logo_url" className="text-[0.8rem] font-semibold text-text-dim uppercase tracking-[0.5px]">
            Logo URL
          </label>
          <input
            id="logo_url"
            type="url"
            className="form-input"
            onBlur={(e) => {
              if (e.target.validity.valid) setLogoPreviewUrl(e.target.value);
            }}
            pattern="https://.+"
            title="Must be a valid URL starting with https://"
            placeholder="https://example.com/logo.png"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="primary_color" className="text-[0.8rem] font-semibold text-text-dim uppercase tracking-[0.5px]">
            Primary Color
          </label>
          <div className="flex gap-3 items-stretch">
            <input
              id="primary_color"
              type="color"
              className="color-picker"
            />
            <input
              type="text"
              className="color-input"
              placeholder={PRIMARY_COLOR}
              pattern="^#[A-Fa-f0-9]{6}$"
              title="Must be a valid hex color (#rrggbb)"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="background_color" className="text-[0.8rem] font-semibold text-text-dim uppercase tracking-[0.5px]">
            Page Background Color
          </label>
          <div className="flex gap-3 items-stretch">
            <input
              id="background_color"
              type="color"
              className="color-picker"
            />
            <input
              type="text"
              className="color-input"
              placeholder={PAGE_BACKGROUND_COLOR}
              pattern="^#[A-Fa-f0-9]{6}$"
              title="Must be a valid hex color (#rrggbb)"
            />
          </div>
        </div>

        {/* Display a message if there is one */}
        {message && (
          <div className={`message ${saveError ? "error" : "success"}`}>
            {message}
          </div>
        )}

        {/* Save button */}
        <button type="submit" disabled={saving} className="save-button">
          {saving ? "Saving..." : "Save Settings"}
        </button>
      </div>
    </form>
  );
}

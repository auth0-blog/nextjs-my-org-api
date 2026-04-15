"use client";

import { useState, useRef, useEffect } from "react";
import { PAGE_BACKGROUND_COLOR, PRIMARY_COLOR } from "@/lib/org-utils";
// add imports
import { MyOrganization } from "@auth0/myorganization-js";
import { saveOrgSettings } from "./actions";

// initialSettings will be passed as a prop from the Server Component.
interface Props {
  initialSettings: MyOrganization.OrgDetails;
}

export default function OrgSettingsForm({ initialSettings }: Props) {

  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [saveError, setSaveError] = useState(false);
  // Local state for form fields, initialized with props from the Server Component. 
  const [settings, setSettings] = useState<MyOrganization.OrgDetails>(initialSettings);

  const [logoPreviewUrl, setLogoPreviewUrl] = useState(
    initialSettings.branding?.logo_url || ""
  );

  // Ref to track message timeout for cleanup
  const messageTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    return () => {
      if (messageTimerRef.current) clearTimeout(messageTimerRef.current);
    };
  }, []);

  // Helper to update a specific field in the settings state
  const updateField = (field: "name" | "display_name", value: string) => {
    setSettings((prev) => ({ ...prev, [field]: value }));
  };

  // Helper to update the logo URL in the settings state
  const updateLogoUrl = (value: string) => {
    setSettings((prev) => ({
      ...prev,
      branding: {
        ...(prev.branding || { logo_url: "", colors: { primary: "", page_background: "" } }),
        logo_url: value,
      },
    }));
  };

  // Helper to update nested color fields in the settings state
  const updateColor = (colorKey: "primary" | "page_background", value: string) => {
    setSettings((prev) => ({
      ...prev,
      branding: {
        ...(prev.branding || { logo_url: "", colors: { primary: "", page_background: "" } }),
        colors: {
          ...(prev.branding?.colors || { primary: "", page_background: "" }),
          [colorKey]: value,
        },
      },
    }));
  };

  // Save settings via a Server Action and update local state/UI.
  const handleSave = async (e: React.FormEvent) => {
        // 👇 new code 
    e.preventDefault();
    setSaving(true);
    setMessage("");
    setSaveError(false);
    if (messageTimerRef.current) clearTimeout(messageTimerRef.current);

    try {

      // Call the Server Action to save settings. This will handle auth and API calls securely on the server.
      const updated = await saveOrgSettings(settings);
      setSettings(updated);
      setLogoPreviewUrl(updated.branding?.logo_url || "");
      setMessage("Settings saved successfully!");
      messageTimerRef.current = setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      console.error("Error saving settings:", error);
      setSaveError(true);
      setMessage("Error saving settings");
    } finally {
      setSaving(false);
    }
    // 👆 new code
    
  };

  return (
    // Everything is wired up
    <form onSubmit={handleSave} noValidate={false}>
      <div className="grid grid-cols-2 gap-x-6 gap-y-5">
        <div className="flex flex-col gap-2">
          <label htmlFor="org-name" className="text-[0.8rem] font-semibold text-text-dim uppercase tracking-[0.5px]">Organization Name</label>
          <input
            id="org-name"
            type="text"
            className="form-input"
            value={settings.name || ""}
            onChange={(e) => updateField("name", e.target.value)}
            placeholder="Enter organization name"
            required
            minLength={1}
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
            value={settings.display_name || ""}
            onChange={(e) => updateField("display_name", e.target.value)}
            placeholder="Enter display name"
            required
            minLength={1}
          />
        </div>

        <div className="flex flex-col gap-2 col-span-full">
          <label className="text-[0.8rem] font-semibold text-text-dim uppercase tracking-[0.5px]">Organization Logo</label>
          <div className="logo-preview" style={{ backgroundColor: "white" }}>
            {logoPreviewUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={logoPreviewUrl} alt="Logo preview" />
            ) : (
              <div className="flex flex-col items-center gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://cdn.auth0.com/manhattan/versions/1.7204.0/assets/badge.png"
                  alt="Default logo"
                  className="w-12 h-12"
                />
                <p className="text-text-muted text-[0.85rem] font-medium m-0">default logo has been used</p>
              </div>
            )}
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
            value={settings.branding?.logo_url || ""}
            onChange={(e) => updateLogoUrl(e.target.value)}
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
              value={settings.branding?.colors?.primary || PRIMARY_COLOR}
              onChange={(e) => updateColor("primary", e.target.value)}
            />
            <input
              type="text"
              className="color-input"
              value={settings.branding?.colors?.primary || PRIMARY_COLOR}
              onChange={(e) => updateColor("primary", e.target.value)}
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
              value={settings.branding?.colors?.page_background || PAGE_BACKGROUND_COLOR}
              onChange={(e) => updateColor("page_background", e.target.value)}
            />
            <input
              type="text"
              className="color-input"
              value={settings.branding?.colors?.page_background || PAGE_BACKGROUND_COLOR}
              onChange={(e) => updateColor("page_background", e.target.value)}
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
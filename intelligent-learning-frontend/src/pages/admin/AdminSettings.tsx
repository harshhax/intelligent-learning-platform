import { motion } from "framer-motion";
import { Save } from "lucide-react";
import { useState } from "react";

export default function AdminSettings() {

  const [settings, setSettings] = useState({
    name: "Admin",
    email: "admin@test.com",
    password: "",
    confirmPassword: "",
    platformName: "Intelligent Learning Platform",
    quizTimeLimit: 10
  });

  const handleChange = (e: any) => {
    setSettings({
      ...settings,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = () => {
    console.log("Saved settings:", settings);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >

      {/* Header */}

      <div>
        <h1 className="text-xl font-bold text-foreground">
          Admin Settings
        </h1>
        <p className="text-sm text-muted-foreground">
          Manage platform configuration and admin account
        </p>
      </div>

      {/* Profile Settings */}

      <div className="rounded-xl border bg-card p-6 shadow-card space-y-4">

        <h2 className="font-semibold text-foreground">
          Admin Profile
        </h2>

        <div className="grid md:grid-cols-2 gap-4">

          <div>
            <label className="text-sm text-muted-foreground">
              Name
            </label>
            <input
              name="name"
              value={settings.name}
              onChange={handleChange}
              className="w-full mt-1 border border-border rounded-lg p-2 text-sm bg-background"
            />
          </div>

          <div>
            <label className="text-sm text-muted-foreground">
              Email
            </label>
            <input
              name="email"
              value={settings.email}
              onChange={handleChange}
              className="w-full mt-1 border border-border rounded-lg p-2 text-sm bg-background"
            />
          </div>

        </div>

      </div>

      {/* Password Change */}

      <div className="rounded-xl border bg-card p-6 shadow-card space-y-4">

        <h2 className="font-semibold text-foreground">
          Change Password
        </h2>

        <div className="grid md:grid-cols-2 gap-4">

          <div>
            <label className="text-sm text-muted-foreground">
              New Password
            </label>
            <input
              type="password"
              name="password"
              value={settings.password}
              onChange={handleChange}
              className="w-full mt-1 border border-border rounded-lg p-2 text-sm bg-background"
            />
          </div>

          <div>
            <label className="text-sm text-muted-foreground">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={settings.confirmPassword}
              onChange={handleChange}
              className="w-full mt-1 border border-border rounded-lg p-2 text-sm bg-background"
            />
          </div>

        </div>

      </div>

      {/* Platform Settings */}

      <div className="rounded-xl border bg-card p-6 shadow-card space-y-4">

        <h2 className="font-semibold text-foreground">
          Platform Settings
        </h2>

        <div className="grid md:grid-cols-2 gap-4">

          <div>
            <label className="text-sm text-muted-foreground">
              Platform Name
            </label>
            <input
              name="platformName"
              value={settings.platformName}
              onChange={handleChange}
              className="w-full mt-1 border border-border rounded-lg p-2 text-sm bg-background"
            />
          </div>

          <div>
            <label className="text-sm text-muted-foreground">
              Quiz Time Limit (minutes)
            </label>
            <input
              type="number"
              name="quizTimeLimit"
              value={settings.quizTimeLimit}
              onChange={handleChange}
              className="w-full mt-1 border border-border rounded-lg p-2 text-sm bg-background"
            />
          </div>

        </div>

      </div>

      {/* Save Button */}

      <div className="flex justify-end">

        <button
          onClick={handleSave}
          className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg shadow hover:bg-primary/90"
        >
          <Save size={16} />
          Save Settings
        </button>

      </div>

    </motion.div>
  );
}
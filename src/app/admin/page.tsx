"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { deleteApp, getApps, initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signOut, type User } from "firebase/auth";
import { addDoc, collection, deleteDoc, doc, getDoc, onSnapshot, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import { BriefcaseBusiness, Building2, ImagePlus, Inbox, LogOut, Mail, Plus, Save, ShieldCheck, Trash2, UserPlus } from "lucide-react";
import { ClientItem, ContactMessage, PortfolioItem, tagsFromInput, tagsToInput } from "@/lib/content";
import { auth, db, firebaseConfig } from "@/lib/firebase";
import { CloudinaryImage } from "@/components/ui/CloudinaryImage";

type AdminRecord = {
  id: string;
  name: string;
  email: string;
  role: string;
};

const emptyPortfolio = {
  name: "",
  industry: "",
  category: "",
  description: "",
  deliverables: "",
  img: "",
};

const emptyClient = {
  name: "",
  desc: "",
  type: "",
  img: "",
  summary: "",
  services: "",
  featured: false,
};

export default function AdminPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [adminName, setAdminName] = useState("");
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"portfolio" | "clients" | "messages" | "admins">("portfolio");
  const [status, setStatus] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([]);
  const [portfolioForm, setPortfolioForm] = useState(emptyPortfolio);
  const [portfolioFile, setPortfolioFile] = useState<File | null>(null);
  const [editingPortfolioId, setEditingPortfolioId] = useState<string | null>(null);

  const [clients, setClients] = useState<ClientItem[]>([]);
  const [clientForm, setClientForm] = useState(emptyClient);
  const [clientFile, setClientFile] = useState<File | null>(null);
  const [editingClientId, setEditingClientId] = useState<string | null>(null);

  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [admins, setAdmins] = useState<AdminRecord[]>([]);
  const [adminForm, setAdminForm] = useState({ name: "", email: "", password: "" });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        router.replace("/login");
        return;
      }

      const adminSnapshot = await getDoc(doc(db, "admins", currentUser.uid));
      if (!adminSnapshot.exists()) {
        await signOut(auth);
        router.replace("/login");
        return;
      }

      setUser(currentUser);
      setAdminName(adminSnapshot.data().name ?? "");
      setLoading(false);
    });

    return unsubscribe;
  }, [router]);

  useEffect(() => {
    if (!user) return;

    const unsubPortfolio = onSnapshot(collection(db, "portfolio"), (snapshot) => {
      setPortfolio(snapshot.docs.map((item) => ({ id: item.id, ...item.data() })) as PortfolioItem[]);
    });
    const unsubClients = onSnapshot(collection(db, "clients"), (snapshot) => {
      setClients(snapshot.docs.map((item) => ({ id: item.id, ...item.data() })) as ClientItem[]);
    });
    const unsubMessages = onSnapshot(collection(db, "contactMessages"), (snapshot) => {
      const nextMessages = snapshot.docs.map((item) => ({ id: item.id, ...item.data() })) as ContactMessage[];
      setMessages(
        nextMessages.sort((a, b) => {
          const aTime = a.createdAt?.toDate?.().getTime() ?? 0;
          const bTime = b.createdAt?.toDate?.().getTime() ?? 0;
          return bTime - aTime;
        }),
      );
    });
    const unsubAdmins = onSnapshot(collection(db, "admins"), (snapshot) => {
      setAdmins(snapshot.docs.map((item) => ({ id: item.id, ...item.data() })) as AdminRecord[]);
    });

    return () => {
      unsubPortfolio();
      unsubClients();
      unsubMessages();
      unsubAdmins();
    };
  }, [user]);

  const counts = useMemo(
    () => [
      { label: "Portfolio cards", value: portfolio.length, icon: BriefcaseBusiness },
      { label: "Clients", value: clients.length, icon: Building2 },
      { label: "Messages", value: messages.length, icon: Inbox },
      { label: "Admins", value: admins.length, icon: ShieldCheck },
    ],
    [admins.length, clients.length, messages.length, portfolio.length],
  );

  async function handleLogout() {
    await signOut(auth);
    router.replace("/login");
  }

  async function savePortfolio(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("");
    try {
      const uploadedImage = portfolioFile ? await uploadImage(portfolioFile) : portfolioForm.img.trim();
      if (!uploadedImage) {
        setStatus("Please upload a portfolio image.");
        return;
      }

      const payload = {
        name: portfolioForm.name.trim(),
        industry: portfolioForm.industry.trim(),
        category: portfolioForm.category.trim(),
        description: portfolioForm.description.trim(),
        deliverables: tagsFromInput(portfolioForm.deliverables),
        img: uploadedImage,
        updatedAt: serverTimestamp(),
      };

      if (editingPortfolioId) {
        await updateDoc(doc(db, "portfolio", editingPortfolioId), payload);
        setStatus("Portfolio card updated.");
      } else {
        await addDoc(collection(db, "portfolio"), { ...payload, createdAt: serverTimestamp() });
        setStatus("Portfolio card added.");
      }
      setPortfolioForm(emptyPortfolio);
      setPortfolioFile(null);
      setEditingPortfolioId(null);
    } catch (error: any) {
      console.error("Error saving portfolio:", error);
      setStatus(error.message || "An error occurred while saving portfolio card.");
    }
  }

  function editPortfolio(item: PortfolioItem) {
    setEditingPortfolioId(item.id);
    setPortfolioForm({
      name: item.name,
      industry: item.industry,
      category: item.category,
      description: item.description,
      deliverables: tagsToInput(item.deliverables ?? []),
      img: item.img,
    });
    setPortfolioFile(null);
    setActiveTab("portfolio");
  }

  async function saveClient(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("");
    try {
      const uploadedImage = clientFile ? await uploadImage(clientFile) : clientForm.img.trim();
      const payload = {
        name: clientForm.name.trim(),
        desc: clientForm.desc.trim(),
        type: clientForm.type.trim(),
        img: uploadedImage,
        summary: clientForm.summary.trim(),
        services: tagsFromInput(clientForm.services),
        featured: clientForm.featured,
        updatedAt: serverTimestamp(),
      };

      if (editingClientId) {
        await updateDoc(doc(db, "clients", editingClientId), payload);
        setStatus("Client updated.");
      } else {
        await addDoc(collection(db, "clients"), { ...payload, createdAt: serverTimestamp() });
        setStatus("Client added.");
      }
      setClientForm(emptyClient);
      setClientFile(null);
      setEditingClientId(null);
    } catch (error: any) {
      console.error("Error saving client:", error);
      setStatus(error.message || "An error occurred while saving client.");
    }
  }

  function editClient(client: ClientItem) {
    setEditingClientId(client.id);
    setClientForm({
      name: client.name,
      desc: client.desc,
      type: client.type,
      img: client.img ?? "",
      summary: client.summary,
      services: tagsToInput(client.services ?? []),
      featured: client.featured,
    });
    setClientFile(null);
    setActiveTab("clients");
  }

  async function uploadImage(file: File) {
    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const currentUser = auth.currentUser;
      const token = currentUser ? await currentUser.getIdToken() : "";

      const response = await fetch("/api/upload", {
        method: "POST",
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: formData,
      });

      const text = await response.text();
      let result: { path?: string; error?: string } = {};
      try {
        if (text.trim()) {
          result = JSON.parse(text);
        }
      } catch (e) {
        throw new Error(`Server returned non-JSON response (Status: ${response.status}). Details: ${text.substring(0, 100)}`);
      }

      if (!response.ok || !result.path) {
        throw new Error(result.error ?? `Image upload failed (Status: ${response.status}).`);
      }

      return result.path;
    } finally {
      setIsUploading(false);
    }
  }

  async function createAdmin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("");

    const secondaryApp =
      getApps().find((existingApp) => existingApp.name === "adminCreator") ??
      initializeApp(firebaseConfig, "adminCreator");
    const secondaryAuth = getAuth(secondaryApp);

    try {
      const credential = await createUserWithEmailAndPassword(
        secondaryAuth,
        adminForm.email.trim(),
        adminForm.password,
      );
      await setDoc(doc(db, "admins", credential.user.uid), {
        name: adminForm.name.trim(),
        email: adminForm.email.trim(),
        role: "admin",
        createdAt: serverTimestamp(),
      });
      await signOut(secondaryAuth);
      setAdminForm({ name: "", email: "", password: "" });
      setStatus("Admin user created.");
    } catch (error: any) {
      console.error("Error creating admin:", error);
      setStatus(error.message || "An error occurred while creating admin user.");
    } finally {
      await deleteApp(secondaryApp).catch(() => undefined);
    }
  }

  async function removeAdmin(admin: AdminRecord) {
    if (admin.id === user?.uid) {
      setStatus("You cannot remove your own admin access while logged in.");
      return;
    }
    await deleteDoc(doc(db, "admins", admin.id));
    setStatus("Admin access removed. The Firebase Auth account still exists.");
  }

  async function markMessageRead(message: ContactMessage) {
    await updateDoc(doc(db, "contactMessages", message.id), {
      status: "read",
      updatedAt: serverTimestamp(),
    });
    setStatus("Message marked as read.");
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-[#040C1A] text-white flex items-center justify-center">
        <div className="text-sm text-[#A8BFDE]">Loading dashboard...</div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#040C1A] text-white">
      <header className="border-b border-[rgba(30,111,255,0.14)] bg-[#081428]">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#1E6FFF] flex items-center justify-center font-bold">C</div>
            <div>
              <p className="font-bold">Cognitoo.inc</p>
              <p className="text-xs text-[#A8BFDE]">Admin dashboard</p>
            </div>
          </Link>
          <button onClick={handleLogout} className="h-10 px-4 rounded-md border border-[rgba(30,111,255,0.2)] text-sm text-[#E8F0FF] hover:bg-[#0D1E3A] flex items-center justify-center gap-2">
            <LogOut size={16} />
            Sign out
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <section className="mb-8">
          <div className="flex items-center gap-2 text-[#00C6FF] text-sm mb-3">
            <ShieldCheck size={16} />
            Firebase CMS connected
          </div>
          <h1 className="text-4xl md:text-5xl mb-3" style={{ fontFamily: "var(--font-heading)", fontWeight: 800 }}>
            Welcome{adminName ? `, ${adminName}` : ""}
          </h1>
          <p className="text-[#A8BFDE] max-w-2xl">
            Add, edit, and remove portfolio work, client records, and admin access.
          </p>
        </section>

        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          {counts.map((card) => {
            const Icon = card.icon;
            return (
              <div key={card.label} className="rounded-lg border border-[rgba(30,111,255,0.14)] bg-[#081428] p-5">
                <Icon className="text-[#00C6FF] mb-5" size={22} />
                <p className="text-3xl font-bold">{card.value}</p>
                <p className="text-sm text-[#A8BFDE]">{card.label}</p>
              </div>
            );
          })}
        </section>

        <div className="flex flex-wrap gap-2 mb-6">
          {[
            ["portfolio", "Portfolio"],
            ["clients", "Clients"],
            ["messages", "Messages"],
            ["admins", "Admins"],
          ].map(([key, label]) => (
            <button
              key={key}
              onClick={() => setActiveTab(key as "portfolio" | "clients" | "messages" | "admins")}
              className="h-10 px-4 rounded-md text-sm transition-colors"
              style={{
                background: activeTab === key ? "#1E6FFF" : "#081428",
                border: "1px solid rgba(30,111,255,0.18)",
                color: activeTab === key ? "#fff" : "#A8BFDE",
              }}
            >
              {label}
            </button>
          ))}
        </div>

        {status && (
          <div className="mb-6 rounded-md border border-[rgba(0,198,255,0.25)] bg-[rgba(0,198,255,0.08)] px-4 py-3 text-sm text-[#A8F1FF]">
            {status}
          </div>
        )}

        {activeTab === "portfolio" && (
          <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <Panel title={editingPortfolioId ? "Edit portfolio card" : "Add portfolio card"} icon={<Plus size={18} />}>
              <form className="space-y-4" onSubmit={savePortfolio}>
                <Input label="Project name" value={portfolioForm.name} onChange={(value) => setPortfolioForm({ ...portfolioForm, name: value })} required />
                <Input label="Industry" value={portfolioForm.industry} onChange={(value) => setPortfolioForm({ ...portfolioForm, industry: value })} required />
                <Input label="Category" value={portfolioForm.category} onChange={(value) => setPortfolioForm({ ...portfolioForm, category: value })} required />
                <Textarea label="Description" value={portfolioForm.description} onChange={(value) => setPortfolioForm({ ...portfolioForm, description: value })} required />
                <Input label="Deliverables, comma separated" value={portfolioForm.deliverables} onChange={(value) => setPortfolioForm({ ...portfolioForm, deliverables: value })} required />
                <FileInput label="Portfolio image" required={!editingPortfolioId && !portfolioForm.img} onChange={setPortfolioFile} disabled={isUploading} />
                {portfolioForm.img && (
                  <ImagePreview src={portfolioForm.img} label="Current portfolio image" />
                )}
                <FormActions onCancel={() => { setPortfolioForm(emptyPortfolio); setPortfolioFile(null); setEditingPortfolioId(null); }} editing={Boolean(editingPortfolioId)} loading={isUploading} />
              </form>
            </Panel>

            <Panel title="Portfolio cards" icon={<BriefcaseBusiness size={18} />}>
              <div className="space-y-3">
                {portfolio.map((item) => (
                  <Row key={item.id} title={item.name} meta={`${item.category} / ${item.industry}`} onEdit={() => editPortfolio(item)} onDelete={() => deleteDoc(doc(db, "portfolio", item.id))} />
                ))}
                {!portfolio.length && <EmptyState text="No portfolio cards yet. Add your first work item." />}
              </div>
            </Panel>
          </section>
        )}

        {activeTab === "clients" && (
          <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <Panel title={editingClientId ? "Edit client" : "Add client"} icon={<Building2 size={18} />}>
              <form className="space-y-4" onSubmit={saveClient}>
                <Input label="Client name" value={clientForm.name} onChange={(value) => setClientForm({ ...clientForm, name: value })} required />
                <Input label="Short descriptor" value={clientForm.desc} onChange={(value) => setClientForm({ ...clientForm, desc: value })} required />
                <Input label="Client type" value={clientForm.type} onChange={(value) => setClientForm({ ...clientForm, type: value })} required />
                <FileInput label="Client image, optional" onChange={setClientFile} disabled={isUploading} />
                {clientForm.img && (
                  <ImagePreview src={clientForm.img} label="Current client image" />
                )}
                <Textarea label="Summary" value={clientForm.summary} onChange={(value) => setClientForm({ ...clientForm, summary: value })} required />
                <Input label="Services, comma separated" value={clientForm.services} onChange={(value) => setClientForm({ ...clientForm, services: value })} required />
                <label className="flex items-center gap-3 text-sm text-[#E8F0FF]">
                  <input type="checkbox" checked={clientForm.featured} onChange={(event) => setClientForm({ ...clientForm, featured: event.target.checked })} />
                  Feature this client
                </label>
                <FormActions onCancel={() => { setClientForm(emptyClient); setClientFile(null); setEditingClientId(null); }} editing={Boolean(editingClientId)} loading={isUploading} />
              </form>
            </Panel>

            <Panel title="Clients" icon={<Building2 size={18} />}>
              <div className="space-y-3">
                {clients.map((client) => (
                  <Row key={client.id} title={client.name} meta={`${client.type}${client.featured ? " / Featured" : ""}`} onEdit={() => editClient(client)} onDelete={() => deleteDoc(doc(db, "clients", client.id))} />
                ))}
                {!clients.length && <EmptyState text="No clients yet. Add the first client record." />}
              </div>
            </Panel>
          </section>
        )}

        {activeTab === "messages" && (
          <section className="grid gap-6">
            <Panel title="Contact messages" icon={<Mail size={18} />}>
              <div className="space-y-4">
                {messages.map((message) => (
                  <MessageCard
                    key={message.id}
                    message={message}
                    onRead={() => markMessageRead(message)}
                    onDelete={() => deleteDoc(doc(db, "contactMessages", message.id))}
                  />
                ))}
                {!messages.length && <EmptyState text="No contact messages yet." />}
              </div>
            </Panel>
          </section>
        )}

        {activeTab === "admins" && (
          <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <Panel title="Create admin" icon={<UserPlus size={18} />}>
              <form className="space-y-4" onSubmit={createAdmin}>
                <Input label="Name" value={adminForm.name} onChange={(value) => setAdminForm({ ...adminForm, name: value })} required />
                <Input label="Email" type="email" value={adminForm.email} onChange={(value) => setAdminForm({ ...adminForm, email: value })} required />
                <Input label="Password" type="password" value={adminForm.password} onChange={(value) => setAdminForm({ ...adminForm, password: value })} required minLength={6} />
                <button type="submit" className="h-11 w-full rounded-md bg-[#1E6FFF] text-sm font-semibold text-white flex items-center justify-center gap-2 hover:bg-[#2979FF]">
                  <UserPlus size={16} />
                  Create admin
                </button>
              </form>
            </Panel>

            <Panel title="Admin users" icon={<ShieldCheck size={18} />}>
              <div className="space-y-3">
                {admins.map((admin) => (
                  <Row key={admin.id} title={admin.name || admin.email} meta={`${admin.email} / ${admin.role ?? "admin"}`} onDelete={() => removeAdmin(admin)} />
                ))}
              </div>
            </Panel>
          </section>
        )}
      </div>
    </main>
  );
}

function Panel({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-[rgba(30,111,255,0.14)] bg-[#081428] p-6">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl font-bold">{title}</h2>
        <div className="text-[#00C6FF]">{icon}</div>
      </div>
      {children}
    </div>
  );
}

function Input({ label, value, onChange, type = "text", required, minLength }: { label: string; value: string; onChange: (value: string) => void; type?: string; required?: boolean; minLength?: number }) {
  return (
    <label className="block">
      <span className="text-sm text-[#E8F0FF]">{label}</span>
      <input
        type={type}
        value={value}
        required={required}
        minLength={minLength}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 w-full h-11 rounded-md border border-[rgba(30,111,255,0.2)] bg-[#0D1E3A] px-3 text-white outline-none focus:border-[#1E6FFF]"
      />
    </label>
  );
}

function Textarea({ label, value, onChange, required }: { label: string; value: string; onChange: (value: string) => void; required?: boolean }) {
  return (
    <label className="block">
      <span className="text-sm text-[#E8F0FF]">{label}</span>
      <textarea
        value={value}
        required={required}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 min-h-28 w-full rounded-md border border-[rgba(30,111,255,0.2)] bg-[#0D1E3A] px-3 py-3 text-white outline-none focus:border-[#1E6FFF]"
      />
    </label>
  );
}

function FileInput({ label, onChange, required, disabled }: { label: string; onChange: (file: File | null) => void; required?: boolean; disabled?: boolean }) {
  return (
    <label className="block">
      <span className="text-sm text-[#E8F0FF]">{label}</span>
      <div className={`mt-2 rounded-md border border-dashed border-[rgba(30,111,255,0.28)] bg-[#0D1E3A] px-3 py-4 ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-md bg-[rgba(30,111,255,0.14)] flex items-center justify-center text-[#00C6FF]">
            <ImagePlus size={18} />
          </div>
          <input
            type="file"
            accept="image/png,image/jpeg,image/webp,image/gif"
            required={required}
            disabled={disabled}
            onChange={(event) => onChange(event.target.files?.[0] ?? null)}
            className="block w-full text-sm text-[#A8BFDE] file:mr-4 file:h-9 file:rounded-md file:border-0 file:bg-[#1E6FFF] file:px-4 file:text-sm file:font-semibold file:text-white hover:file:bg-[#2979FF] disabled:pointer-events-none"
          />
        </div>
        <p className="mt-2 text-xs text-[#7A95B8]">JPG, PNG, WebP, or GIF. Max 5MB.</p>
      </div>
    </label>
  );
}

function ImagePreview({ src, label }: { src: string; label: string }) {
  return (
    <div>
      <p className="mb-2 text-sm text-[#E8F0FF]">{label}</p>
      <div className="h-32 overflow-hidden rounded-md border border-[rgba(30,111,255,0.2)] bg-[#0D1E3A]">
        <CloudinaryImage src={src} alt={label} width={300} height={200} className="h-full w-full object-cover" />
      </div>
    </div>
  );
}

function FormActions({ editing, onCancel, loading }: { editing: boolean; onCancel: () => void; loading?: boolean }) {
  return (
    <div className="flex gap-3">
      <button 
        type="submit" 
        disabled={loading}
        className="h-11 flex-1 rounded-md bg-[#1E6FFF] text-sm font-semibold text-white flex items-center justify-center gap-2 hover:bg-[#2979FF] disabled:bg-[#1E6FFF]/50 disabled:cursor-not-allowed"
      >
        {loading ? (
          <>
            <span className="animate-spin inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2" />
            Uploading image...
          </>
        ) : (
          <>
            <Save size={16} />
            {editing ? "Save changes" : "Add item"}
          </>
        )}
      </button>
      {editing && (
        <button 
          type="button" 
          onClick={onCancel} 
          disabled={loading}
          className="h-11 px-4 rounded-md border border-[rgba(30,111,255,0.2)] text-sm text-[#A8BFDE] hover:bg-[#0D1E3A] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Cancel
        </button>
      )}
    </div>
  );
}

function Row({ title, meta, onEdit, onDelete }: { title: string; meta: string; onEdit?: () => void; onDelete: () => void }) {
  return (
    <div className="rounded-md bg-[#0D1E3A] px-4 py-3 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
      <div>
        <p className="font-semibold">{title}</p>
        <p className="text-xs text-[#A8BFDE]">{meta}</p>
      </div>
      <div className="flex gap-2">
        {onEdit && (
          <button onClick={onEdit} className="h-9 px-3 rounded-md border border-[rgba(30,111,255,0.2)] text-sm text-[#E8F0FF] hover:bg-[#081428]">
            Edit
          </button>
        )}
        <button onClick={onDelete} className="h-9 px-3 rounded-md border border-[rgba(255,80,80,0.25)] text-sm text-red-200 hover:bg-[rgba(255,80,80,0.08)] flex items-center gap-2">
          <Trash2 size={14} />
          Remove
        </button>
      </div>
    </div>
  );
}

function MessageCard({ message, onRead, onDelete }: { message: ContactMessage; onRead: () => void; onDelete: () => void }) {
  const createdAt = message.createdAt?.toDate?.();

  return (
    <div className="rounded-lg border border-[rgba(30,111,255,0.14)] bg-[#0D1E3A] p-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <h3 className="text-lg font-bold text-white">{message.fullName}</h3>
            <span
              className="rounded-full px-2.5 py-1 text-xs"
              style={{
                background: message.status === "new" ? "rgba(0,198,255,0.12)" : "rgba(122,149,184,0.12)",
                color: message.status === "new" ? "#A8F1FF" : "#A8BFDE",
                border: "1px solid rgba(30,111,255,0.16)",
              }}
            >
              {message.status === "new" ? "New" : "Read"}
            </span>
          </div>
          <p className="text-sm text-[#A8BFDE]">{message.companyName || "No company provided"}</p>
          <p className="text-xs text-[#7A95B8]">
            {createdAt ? createdAt.toLocaleString() : "Date pending"}
          </p>
        </div>

        <div className="flex gap-2">
          {message.status !== "read" && (
            <button onClick={onRead} className="h-9 px-3 rounded-md border border-[rgba(30,111,255,0.2)] text-sm text-[#E8F0FF] hover:bg-[#081428]">
              Mark read
            </button>
          )}
          <button onClick={onDelete} className="h-9 px-3 rounded-md border border-[rgba(255,80,80,0.25)] text-sm text-red-200 hover:bg-[rgba(255,80,80,0.08)] flex items-center gap-2">
            <Trash2 size={14} />
            Remove
          </button>
        </div>
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-2 text-sm">
        <Info label="Email" value={message.email} />
        <Info label="Phone" value={message.phone || "Not provided"} />
        <Info label="Website / Social" value={message.website || "Not provided"} />
        <Info label="Preferred contact" value={message.contactMethod || "Not provided"} />
        <Info label="Industry" value={message.industry || "Not provided"} />
        <Info label="Budget" value={message.budget || "Not provided"} />
      </div>

      {!!message.services.length && (
        <div className="mt-4 flex flex-wrap gap-2">
          {message.services.map((service) => (
            <span key={service} className="rounded-full border border-[rgba(30,111,255,0.18)] bg-[rgba(30,111,255,0.08)] px-3 py-1 text-xs text-[#7AB8FF]">
              {service}
            </span>
          ))}
        </div>
      )}

      <div className="mt-4 rounded-md bg-[#081428] p-4">
        <p className="text-xs uppercase tracking-wide text-[#7A95B8] mb-2">Message</p>
        <p className="text-sm leading-relaxed text-[#E8F0FF] whitespace-pre-wrap">
          {message.message || "No message provided."}
        </p>
      </div>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-[#7A95B8]">{label}</p>
      <p className="text-[#E8F0FF] break-words">{value}</p>
    </div>
  );
}

function EmptyState({ text }: { text: string }) {
  return <p className="rounded-md bg-[#0D1E3A] px-4 py-5 text-sm text-[#A8BFDE]">{text}</p>;
}

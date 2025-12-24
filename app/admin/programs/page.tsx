"use client"
import { useEffect, useState } from "react";
import {
    PlusCircle,
    Pencil,
    Trash2,
    X,
    Layers,
    ImageIcon,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { apiFetch } from "@/lib/axios";
import { apiUrl } from "@/lib/constants";

const ICONS = ["Users", "BookOpen", "Trophy", "Calendar"];

export default function Programs() {
    const [programs, setPrograms] = useState<any>([]);
    const [editingId, setEditingId] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [preview, setPreview] = useState<any>(null);

    const [form, setForm] = useState({
        title: "",
        subtitle: "",
        description: "",
        features: "",
        icon: "Users",
        type: "main",
    });

    /* ---------------- FETCH ---------------- */
    const fetchPrograms = async () => {
        const res = await apiFetch("/programs");
        setPrograms(Array.isArray(res) ? res : []);
    };

    useEffect(() => {
        fetchPrograms();
    }, []);

    /* ---------------- HANDLERS ---------------- */
    const handleChange = (e: any) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const handleImageChange = (e: any) => {
        const file = e.target.files[0];
        if (!file) return;

        setImageFile(file);
        setPreview(URL.createObjectURL(file));
    };

    const resetForm = () => {
        setEditingId(null);
        setImageFile(null);
        setPreview(null);
        setForm({
            title: "",
            subtitle: "",
            description: "",
            features: "",
            icon: "Users",
            type: "main",
        });
    };

    /* ---------------- SUBMIT ---------------- */
    const handleSubmit = async () => {
        if (!form.title.trim())
            return toast({ title: "Program title is required" });

        if (!editingId && !imageFile)
            return toast({ title: "Program image is required" });

        const formData = new FormData();
        formData.append("title", form.title);
        formData.append("subtitle", form.subtitle);
        formData.append("description", form.description);
        formData.append("icon", form.icon);
        formData.append("type", form.type);
        formData.append(
            "features",
            JSON.stringify(
                form.features
                    .split(",")
                    .map((f) => f.trim())
                    .filter(Boolean)
            )
        );

        if (imageFile) {
            formData.append("image", imageFile);
        }

        try {
            if (editingId) {
                const updated = await apiFetch(`/programs/${editingId}`, {
                    method: "PUT",
                    data: formData,
                });
                setPrograms(programs.map((p: any) => p._id === editingId ? updated : p));
                toast({ title: "Program updated" });
            } else {
                const created = await apiFetch("/programs", {
                    method: "POST",
                    data: formData,
                });
                setPrograms([created, ...programs]);
                toast({ title: "Program created" });
            }
            resetForm();
        } catch (err) {
            toast({ title: "Failed to save program" });
        }
    };

    /* ---------------- EDIT ---------------- */
    const handleEdit = (program: any) => {
        setEditingId(program._id);
        setForm({
            title: program.title,
            subtitle: program.subtitle || "",
            description: program.description || "",
            features: program.features?.join(", ") || "",
            icon: program.icon,
            type: program.type,
        });
        setPreview((apiUrl.replace('/api', '') + program.image?.url) || null);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    /* ---------------- DELETE ---------------- */
    const handleDelete = async (id: any) => {
        if (!confirm("Delete this program?")) return;
        await apiFetch(`/programs/${id}`, { method: "DELETE" });
        setPrograms(programs.filter((p: any) => p._id !== id));
        toast({ title: "Program deleted" });
    };

    /* ---------------- UI ---------------- */
    return (
        <div className="min-h-screen bg-slate-50 py-10 px-4">
            <div className="max-w-6xl mx-auto space-y-10">

                {/* HEADER */}
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-black flex items-center gap-3">
                        <Layers className="w-8 h-8 text-indigo-600" />
                        Programs Manager
                    </h1>
                    <div className="bg-white px-4 py-2 rounded-full border text-sm font-bold">
                        {programs.length} programs
                    </div>
                </div>

                {/* FORM */}
                <div className={`rounded-3xl border shadow-xl overflow-hidden ${editingId ? "border-amber-200 bg-amber-50" : "border-indigo-200 bg-white"
                    }`}>
                    <div className={`px-8 py-5 flex justify-between ${editingId ? "bg-amber-100" : "bg-indigo-50"
                        }`}>
                        <h2 className="font-black flex items-center gap-2">
                            {editingId ? <Pencil /> : <PlusCircle />}
                            {editingId ? "Edit Program" : "Add Program"}
                        </h2>
                        {editingId && (
                            <button onClick={resetForm}><X /></button>
                        )}
                    </div>

                    <div className="p-8 grid md:grid-cols-2 gap-6">

                        <input name="title" value={form.title} onChange={handleChange}
                            placeholder="Program Title" className="input" />

                        <input name="subtitle" value={form.subtitle} onChange={handleChange}
                            placeholder="Subtitle" className="input" />

                        <textarea name="description" value={form.description} onChange={handleChange}
                            placeholder="Description" className="input md:col-span-2 resize-none" />

                        {/* IMAGE UPLOAD */}
                        <label className="md:col-span-2 border-2 border-dashed rounded-2xl p-6 cursor-pointer hover:border-indigo-500 transition flex flex-col items-center gap-3">
                            <ImageIcon className="w-8 h-8 text-indigo-500" />
                            <span className="text-sm font-bold text-slate-600">
                                Click to upload image
                            </span>
                            <input type="file" accept="image/*" hidden onChange={handleImageChange} />
                        </label>

                        {preview && (
                            <img
                                src={preview}
                                alt="preview"
                                className="md:col-span-2 h-64 w-full object-cover rounded-2xl border"
                            />
                        )}

                        <input name="features" value={form.features} onChange={handleChange}
                            placeholder="Features (comma separated)" className="input" />

                        <select name="icon" value={form.icon} onChange={handleChange} className="input">
                            {ICONS.map(i => <option key={i} value={i}>{i}</option>)}
                        </select>

                        <select name="type" value={form.type} onChange={handleChange} className="input">
                            <option value="main">Main Program</option>
                            <option value="additional">Additional Program</option>
                        </select>

                        <button
                            onClick={handleSubmit}
                            className={`md:col-span-2 py-4 rounded-2xl font-black text-white ${editingId ? "bg-amber-500" : "bg-indigo-600"
                                }`}
                        >
                            {editingId ? "Save Changes" : "Create Program"}
                        </button>
                    </div>
                </div>

                {/* LIST */}
                <div className="space-y-4">
                    {programs.map((program: any) => (
                        <div key={program._id}
                            className="bg-white rounded-3xl p-6 border flex justify-between items-center">
                            <div className="flex gap-5">
                                <img
                                    src={apiUrl.replace('/api', '') + program.image?.url}
                                    className="w-20 h-20 rounded-2xl object-cover border"
                                />
                                <div>
                                    <h3 className="font-black text-lg">{program.title}</h3>
                                    <p className="text-xs uppercase font-bold text-indigo-600">
                                        {program.type} • {program.icon}
                                    </p>
                                    <p className="text-sm text-slate-400 line-clamp-1">
                                        {program.description}
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button onClick={() => handleEdit(program)} className="p-3 bg-indigo-50 rounded-xl">
                                    <Pencil className="w-4 h-4" />
                                </button>
                                <button onClick={() => handleDelete(program._id)} className="p-3 bg-rose-50 rounded-xl">
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

            </div>

            <style>{`
        .input {
          width: 100%;
          padding: 14px;
          border-radius: 16px;
          border: 1px solid #e5e7eb;
          background: #f8fafc;
        }
        .input:focus {
          border-color: #6366f1;
          background: white;
          outline: none;
        }
      `}</style>
        </div>
    );
}

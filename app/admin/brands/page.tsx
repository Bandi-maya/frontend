"use client"
import { useEffect, useState } from "react";
import {
    Tag,
    Plus,
    Pencil,
    Trash2,
    Globe,
    Info,
    X,
    CheckCircle2,
    Building2
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { apiFetch } from "@/lib/axios";

export default function Brands() {
    const [brands, setBrands] = useState<any>([]);
    const [form, setForm] = useState({
        title: "",
        subTitle: "",
        description: "",
    });
    const [editingId, setEditingId] = useState(null);

    const fetchBrands = async () => {
        const res = await apiFetch("/brands");
        // Handling potential data structure differences
        setBrands(Array.isArray(res) ? res : res.data || []);
    };

    useEffect(() => {
        fetchBrands();
    }, []);

    const handleChange = (e: any) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        if (!form.title.trim()) return toast({ title: "Brand title is required" });

        try {
            if (editingId) {
                const updated = await apiFetch(`/brands/${editingId}`, {
                    method: "PUT",
                    data: form,
                });
                setBrands(brands.map((b: any) => (b._id === editingId ? updated : b)));
                setEditingId(null);
            } else {
                const newBrand = await apiFetch("/brands", {
                    method: "POST",
                    data: form,
                });
                setBrands([...brands, newBrand]);
            }
            setForm({ title: "", subTitle: "", description: "" });
        } catch (error) {
            toast({
                title: "Error saving brand!"
            })
        }
    };

    const handleDelete = async (id: any) => {
        if (!confirm("Are you sure you want to delete this brand? Products linked to it will remain but won't have a brand reference.")) return;
        await apiFetch(`/brands/${id}`, { method: "DELETE" });
        setBrands(brands.filter((b: any) => b._id !== id));
    };

    const handleEdit = (brand: any) => {
        setEditingId(brand._id);
        setForm({
            title: brand.title,
            subTitle: brand.subTitle || "",
            description: brand.description || "",
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="min-h-screen bg-[#f8fafc] py-12 px-4">
            <div className="max-w-5xl mx-auto">

                {/* Header Area */}
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
                    <div>
                        <h1 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
                            <Building2 className="w-8 h-8 text-indigo-600" />
                            Brand Partners
                        </h1>
                        <p className="text-slate-500 font-medium">Manage your manufacturer and designer relationships.</p>
                    </div>
                    <div className="bg-white px-4 py-2 rounded-full border shadow-sm text-sm font-bold text-slate-600">
                        {brands.length} active brands
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Left Side: Form */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-100 overflow-hidden sticky top-8">
                            <div className={`p-6 border-b ${editingId ? 'bg-amber-50 border-amber-100' : 'bg-indigo-50 border-indigo-100'}`}>
                                <h3 className={`font-bold flex items-center gap-2 ${editingId ? 'text-amber-700' : 'text-indigo-700'}`}>
                                    {editingId ? <Pencil className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                                    {editingId ? "Update Brand" : "Create New Brand"}
                                </h3>
                            </div>

                            <div className="p-6 space-y-5">
                                <div className="space-y-2">
                                    <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Brand Name</label>
                                    <input
                                        name="title"
                                        value={form.title}
                                        onChange={handleChange}
                                        placeholder="e.g. Nike, Apple, Sony"
                                        className="w-full bg-slate-50 border-transparent border focus:bg-white focus:border-indigo-500 rounded-2xl px-4 py-3 outline-none transition-all font-semibold"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Slogan / Subtitle</label>
                                    <input
                                        name="subTitle"
                                        value={form.subTitle}
                                        onChange={handleChange}
                                        placeholder="Just Do It"
                                        className="w-full bg-slate-50 border-transparent border focus:bg-white focus:border-indigo-500 rounded-2xl px-4 py-3 outline-none transition-all"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest">About the Brand</label>
                                    <textarea
                                        name="description"
                                        // rows="4"
                                        value={form.description}
                                        onChange={handleChange}
                                        placeholder="History and values..."
                                        className="w-full bg-slate-50 border-transparent border focus:bg-white focus:border-indigo-500 rounded-2xl px-4 py-3 outline-none transition-all resize-none"
                                    />
                                </div>

                                <div className="flex gap-3 pt-2">
                                    <button
                                        onClick={handleSubmit}
                                        className={`flex-1 py-4 rounded-2xl font-bold text-white transition-all shadow-lg active:scale-95 ${editingId ? 'bg-amber-500 hover:bg-amber-600 shadow-amber-200' : 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-200'}`}
                                    >
                                        {editingId ? "Save Changes" : "Confirm & Add"}
                                    </button>
                                    {editingId && (
                                        <button
                                            onClick={() => { setEditingId(null); setForm({ title: "", subTitle: "", description: "" }); }}
                                            className="bg-slate-100 p-4 rounded-2xl text-slate-400 hover:text-slate-600 transition-colors"
                                        >
                                            <X className="w-5 h-5" />
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side: List */}
                    <div className="lg:col-span-2">
                        {brands.length === 0 ? (
                            <div className="bg-white border-2 border-dashed border-slate-200 rounded-3xl py-20 flex flex-col items-center">
                                <Building2 className="w-16 h-16 text-slate-200 mb-4" />
                                <p className="text-slate-400 font-bold">No brands in your registry yet.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 gap-4">
                                {brands.map((brand: any) => (
                                    <div key={brand._id} className="group bg-white p-5 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-indigo-500/5 transition-all flex items-center justify-between">
                                        <div className="flex items-center gap-5">
                                            {/* Dummy Logo Circle */}
                                            <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center text-indigo-600 font-black text-xl border border-slate-100 uppercase">
                                                {brand.title.charAt(0)}
                                            </div>
                                            <div>
                                                <h4 className="text-lg font-bold text-slate-800 tracking-tight">{brand.title}</h4>
                                                {brand.subTitle && <p className="text-indigo-600 text-xs font-black uppercase tracking-tighter mb-1">{brand.subTitle}</p>}
                                                {brand.description && <p className="text-slate-400 text-sm line-clamp-1 max-w-sm">{brand.description}</p>}
                                            </div>
                                        </div>

                                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
                                            <button
                                                onClick={() => handleEdit(brand)}
                                                className="p-3 bg-indigo-50 text-indigo-600 hover:bg-indigo-600 hover:text-white rounded-xl transition-all"
                                            >
                                                <Pencil className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(brand._id)}
                                                className="p-3 bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white rounded-xl transition-all"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                    // line-clamp-1
                                )
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
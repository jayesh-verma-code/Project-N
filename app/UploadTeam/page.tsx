'use client';
import { useState, ChangeEvent, FormEvent,useRef } from 'react';
import { useRouter } from 'next/navigation';
import CustomCursor from '@/components/shared/custom-cursor';
import { ThemeProvider } from 'next-themes';
import ParticlesBackground from '@/components/shared/particle-background';
interface FormDataType {
    id: string;
    name: string;
    role: string;
    category: string;
    education: string;
    avatar: File | null;
}

export default function AddTeamMember() {
    const router = useRouter();
    const [formData, setFormData] = useState<FormDataType>({
        id: '',
        name: '',
        role: '',
        category: 'intern',
        education: '',
        avatar: null
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [preview, setPreview] = useState<string | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setFormData({
            ...formData,
            avatar: file
        });

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        } else {
            setPreview(null);
        }
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        const data = new FormData();
        data.append('id', formData.id);
        data.append('name', formData.name);
        data.append('role', formData.role);
        data.append('category', formData.category);
        data.append('education', formData.education);
        if (formData.avatar) {
            data.append('avatar', formData.avatar);
        }

        try {
            const response = await fetch('/api/team', {
                method: 'POST',
                body: data
            });

            const result = await response.json();
            if (result.success) {
                alert('Team member added successfully!');
                router.push('/team');
            } else {
                throw new Error(result.message);
            }
        } catch (error: any) {
            console.error('Error:', error);
            alert(`Error: ${error.message}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <ThemeProvider attribute="class" defaultTheme="dark">
        <CustomCursor
                      containerRef={containerRef as React.RefObject<HTMLDivElement>}
                    />
        <ParticlesBackground/>            
        <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
             
            <div className="max-w-md mx-auto">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-extrabold text-white sm:text-4xl">
                        NirveonX Data
                    </h1>
                    <p className="mt-2 text-sm text-gray-300">
                        Fill all the fields.
                    </p>
                </div>
                
                <div className="bg-gray-800 rounded-xl shadow-xl overflow-hidden p-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">ID (optional)</label>
                            <input
                                type="text"
                                name="id"
                                value={formData.id}
                                onChange={handleChange}
                                className="w-full px-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white placeholder-gray-400 transition duration-200"
                                placeholder="Will be auto-generated if empty"
                            />
                        </div> */}

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">Name*</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white placeholder-gray-400 transition duration-200"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">Role*</label>
                            <input
                                type="text"
                                name="role"
                                value={formData.role}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white placeholder-gray-400 transition duration-200"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">Category*</label>
                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white transition duration-200 appearance-none"
                            >
                                <option value="intern">Intern</option>
                                <option value="employee">Employee</option>
                                <option value="leadership">Leadership</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">Education*</label>
                            <input
                                type="text"
                                name="education"
                                value={formData.education}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white placeholder-gray-400 transition duration-200"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">Avatar*</label>
                            <div className="mt-1 flex items-center">
                                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-600 rounded-lg cursor-pointer bg-gray-700 hover:bg-gray-600 transition duration-200">
                                    {preview ? (
                                        <img src={preview} alt="Preview" className="h-full w-full object-cover rounded-lg" />
                                    ) : (
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6 px-4 text-center">
                                            <svg className="w-8 h-8 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                                            </svg>
                                            <p className="mb-2 text-sm text-gray-400">
                                                <span className="font-semibold">Click to upload</span> or drag and drop
                                            </p>
                                            <p className="text-xs text-gray-400">PNG, JPG, JPEG (MAX. 5MB)</p>
                                        </div>
                                    )}
                                    <input 
                                        type="file" 
                                        name="avatar"
                                        onChange={handleFileChange}
                                        accept="image/*"
                                        required
                                        className="hidden" 
                                    />
                                </label>
                            </div>
                        </div>

                        <div className="pt-2">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 focus:ring-4 focus:ring-blue-800 focus:outline-none rounded-lg text-white font-medium transition duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:transform-none"
                            >
                                {isSubmitting ? (
                                    <span className="flex items-center justify-center">
                                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Processing...
                                    </span>
                                ) : (
                                    'Add Team Member'
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        </ThemeProvider>
    );
}
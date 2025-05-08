// CreateUserProfile.jsx
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Loader2, Plus, Trash2, UserPlus } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from 'framer-motion';

// API URL - This should match the one in your main component
const API_URL = 'https://goldencare-api.onrender.com';

interface CreateUserProfileProps {
  onUserCreated: (name: string) => void;
  setMessage: (message: { type: "success" | "error"; text: string }) => void;
}

const CreateUserProfile: React.FC<CreateUserProfileProps> = ({ onUserCreated, setMessage }) => {
  const [name, setName] = useState('');
  const [age, setAge] = useState(65);
  const [conditions, setConditions] = useState<string[]>([]);
  const [newCondition, setNewCondition] = useState('');
  const [systolicBaseline, setSystolicBaseline] = useState(120);
  const [diastolicBaseline, setDiastolicBaseline] = useState(80);
  const [sugarBaseline, setSugarBaseline] = useState(100);
  const [diet, setDiet] = useState('Balanced');
  const [exercise, setExercise] = useState('Moderate');
  const [medications, setMedications] = useState<string[]>([]);
  const [newMedication, setNewMedication] = useState('');
  const [loading, setLoading] = useState(false);

  // Common health conditions for elderly
  const commonConditions = [
    'Hypertension', 'Diabetes', 'Arthritis', 'Heart Disease', 
    'COPD', 'Dementia', 'Osteoporosis', 'Depression'
  ];

  // Handle adding a new condition
  const handleAddCondition = () => {
    if (newCondition && !conditions.includes(newCondition)) {
      setConditions([...conditions, newCondition]);
      setNewCondition('');
    }
  };

  // Handle removing a condition
  const handleRemoveCondition = (condition:string) => {
    setConditions(conditions.filter(c => c !== condition));
  };

  // Handle adding a new medication
  const handleAddMedication = () => {
    if (newMedication && !medications.includes(newMedication)) {
      setMedications([...medications, newMedication]);
      setNewMedication('');
    }
  };

  // Handle removing a medication
  const handleRemoveMedication = (medication:string) => {
    setMedications(medications.filter(m => m !== medication));
  };

  // Handle profile submission
  interface ProfileData {
    name: string;
    age: number;
    conditions: string[];
    bp_baseline: {
      systolic: number;
      diastolic: number;
    };
    sugar_baseline: number;
    lifestyle: {
      diet: string;
      exercise: string;
      medications: string[];
    };
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setLoading(true);

    const profileData: ProfileData = {
      name: name,
      age: parseInt(age.toString(), 10),
      conditions: conditions,
      bp_baseline: {
        systolic: parseInt(systolicBaseline.toString(), 10),
        diastolic: parseInt(diastolicBaseline.toString(), 10),
      },
      sugar_baseline: parseInt(sugarBaseline.toString(), 10),
      lifestyle: {
        diet: diet,
        exercise: exercise,
        medications: medications,
      },
    };

    try {
      const response: Response = await fetch(`${API_URL}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profileData),
      });

      const data: { detail?: string } = await response.json();

      if (response.ok) {
        setMessage({
          type: 'success',
          text: 'Health profile created successfully!',
        });
        onUserCreated(name); // Pass name back to parent component
      } else {
        setMessage({
          type: 'error',
          text: data.detail || 'Failed to create profile. Please try again.',
        });
      }
    } catch (error) {
      setMessage({
        type: 'error',
        text: 'Error connecting to server. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="mb-6"
    >
      <Card className="backdrop-blur-md bg-slate-900/40 border-slate-700/30 shadow-xl overflow-hidden">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl text-slate-100 flex items-center gap-2">
            <div className="bg-blue-500/10 backdrop-blur-md rounded-full p-1 border border-blue-500/20">
              <UserPlus className="w-4 h-4 text-blue-400" />
            </div>
            Create Health Profile
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-slate-400 mb-6">Fill out your health information to get started with personalized health tracking.</p>
          
          <form onSubmit={handleSubmit}>
            <Tabs defaultValue="basic" className="mb-6">
              <TabsList className="grid grid-cols-3 bg-slate-800/50 backdrop-blur-sm border border-slate-700/50">
                <TabsTrigger value="basic" className="data-[state=active]:bg-blue-600 text-slate-300 data-[state=active]:text-white">
                  Basic Info
                </TabsTrigger>
                <TabsTrigger value="health" className="data-[state=active]:bg-blue-600 text-slate-300 data-[state=active]:text-white">
                  Health Data
                </TabsTrigger>
                <TabsTrigger value="lifestyle" className="data-[state=active]:bg-blue-600 text-slate-300 data-[state=active]:text-white">
                  Lifestyle
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="basic" className="space-y-4 mt-4">
                <div>
                  <Label htmlFor="name" className="block mb-2 text-slate-300">Full Name</Label>
                  <Input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-slate-800/50 backdrop-blur-sm border-slate-700/50 hover:border-blue-500/30 focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20"
                    placeholder="Enter your name"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="age" className="block mb-2 text-slate-300">Age</Label>
                  <Input
                    id="age"
                    type="number"
                    value={age}
                    onChange={(e) => setAge(Number(e.target.value))}
                    className="w-full bg-slate-800/50 backdrop-blur-sm border-slate-700/50 hover:border-blue-500/30 focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20"
                    min="0"
                    max="120"
                    required
                  />
                </div>
                
                <div>
                  <Label className="block mb-2 text-slate-300">Medical Conditions</Label>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {conditions.map((condition) => (
                      <div 
                        key={condition} 
                        className="flex items-center gap-1 bg-slate-800/70 text-slate-300 text-sm py-1 px-2 rounded-md"
                      >
                        {condition}
                        <button 
                          type="button" 
                          onClick={() => handleRemoveCondition(condition)}
                          className="text-slate-500 hover:text-red-400"
                        >
                          <Trash2 className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex gap-2">
                    <Select 
                      value={newCondition} 
                      onValueChange={setNewCondition}
                    >
                      <SelectTrigger className="flex-grow bg-slate-800/50 backdrop-blur-sm border-slate-700/50 text-slate-300">
                        <SelectValue placeholder="Select or type condition" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800/95 border-slate-700/50">
                        {commonConditions.map((condition) => (
                          <SelectItem key={condition} value={condition} className="hover:bg-slate-700/50">
                            {condition}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Button 
                      type="button"
                      onClick={handleAddCondition}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">Select from the list or type your own condition</p>
                </div>
              </TabsContent>
              
              <TabsContent value="health" className="space-y-4 mt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="systolicBaseline" className="block mb-2 text-slate-300">Systolic BP (mmHg)</Label>
                    <Input
                      id="systolicBaseline"
                      type="number"
                      value={systolicBaseline}
                      onChange={(e) => setSystolicBaseline(Number(e.target.value))}
                      className="w-full bg-slate-800/50 backdrop-blur-sm border-slate-700/50 hover:border-blue-500/30 focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20"
                      min="0"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="diastolicBaseline" className="block mb-2 text-slate-300">Diastolic BP (mmHg)</Label>
                    <Input
                      id="diastolicBaseline"
                      type="number"
                      value={diastolicBaseline}
                      onChange={(e) => setDiastolicBaseline(Number(e.target.value))}
                      className="w-full bg-slate-800/50 backdrop-blur-sm border-slate-700/50 hover:border-blue-500/30 focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20"
                      min="0"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="sugarBaseline" className="block mb-2 text-slate-300">Blood Sugar Baseline (mg/dL)</Label>
                  <Input
                    id="sugarBaseline"
                    type="number"
                    value={sugarBaseline}
                    onChange={(e) => setSugarBaseline(Number(e.target.value))}
                    className="w-full bg-slate-800/50 backdrop-blur-sm border-slate-700/50 hover:border-blue-500/30 focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20"
                    min="0"
                    required
                  />
                </div>
              </TabsContent>
              
              <TabsContent value="lifestyle" className="space-y-4 mt-4">
                <div>
                  <Label htmlFor="diet" className="block mb-2 text-slate-300">Diet Type</Label>
                  <Select value={diet} onValueChange={setDiet}>
                    <SelectTrigger className="w-full bg-slate-800/50 backdrop-blur-sm border-slate-700/50 text-slate-300">
                      <SelectValue placeholder="Select diet type" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800/95 border-slate-700/50">
                      <SelectItem value="Low Sodium" className="hover:bg-slate-700/50">Low Sodium</SelectItem>
                      <SelectItem value="Diabetic" className="hover:bg-slate-700/50">Diabetic</SelectItem>
                      <SelectItem value="Low Fat" className="hover:bg-slate-700/50">Low Fat</SelectItem>
                      <SelectItem value="Vegetarian" className="hover:bg-slate-700/50">Vegetarian</SelectItem>
                      <SelectItem value="Balanced" className="hover:bg-slate-700/50">Balanced</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="exercise" className="block mb-2 text-slate-300">Exercise Level</Label>
                  <Select value={exercise} onValueChange={setExercise}>
                    <SelectTrigger className="w-full bg-slate-800/50 backdrop-blur-sm border-slate-700/50 text-slate-300">
                      <SelectValue placeholder="Select exercise level" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800/95 border-slate-700/50">
                      <SelectItem value="None" className="hover:bg-slate-700/50">None</SelectItem>
                      <SelectItem value="Light" className="hover:bg-slate-700/50">Light</SelectItem>
                      <SelectItem value="Moderate" className="hover:bg-slate-700/50">Moderate</SelectItem>
                      <SelectItem value="Active" className="hover:bg-slate-700/50">Active</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label className="block mb-2 text-slate-300">Medications</Label>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {medications.map((medication) => (
                      <div 
                        key={medication} 
                        className="flex items-center gap-1 bg-slate-800/70 text-slate-300 text-sm py-1 px-2 rounded-md"
                      >
                        {medication}
                        <button 
                          type="button" 
                          onClick={() => handleRemoveMedication(medication)}
                          className="text-slate-500 hover:text-red-400"
                        >
                          <Trash2 className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex gap-2">
                    <Input
                      type="text"
                      value={newMedication}
                      onChange={(e) => setNewMedication(e.target.value)}
                      className="flex-grow bg-slate-800/50 backdrop-blur-sm border-slate-700/50 hover:border-blue-500/30 focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20"
                      placeholder="Enter medication name"
                    />
                    <Button 
                      type="button"
                      onClick={handleAddMedication}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
            
            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 shadow-lg hover:shadow-blue-500/10 transition-all duration-300 py-6 text-lg"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Creating Profile...
                </>
              ) : 'Create Profile'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default CreateUserProfile;
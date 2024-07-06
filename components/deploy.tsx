import React, { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import toast, { Toaster } from 'react-hot-toast';
import { CardDemo } from "./url-card";


interface DeplyFormProps {
  onProjectIdReceived: (projectId: string) => void; // Define a callback prop type
}

const DeplyForm: React.FC<DeplyFormProps> = ({ onProjectIdReceived }) => {
  const [name, setName] = useState("");
  const [gitURL, setGitUrl] = useState("");
  const [framework, setFramework] = useState("");
  const [slug, setSlug] = useState("");
  const [deployedURL, setDeployedURL] = useState("");
  const [projectID, setProjectID] = useState("");
  const [loading,setloading] = useState(false);
  const [showCardDemo, setShowCardDemo] = useState(false);

  setTimeout(() => {
    setShowCardDemo(true);
  }, 10000); // 10000 milliseconds = 10 seconds


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log(gitURL);
    console.log(slug);

   // Regex pattern for validating Git repository URLs
   const gitUrlPattern = /^https:\/\/github\.com\/[^\/]+\/[^\/]+$/;

   if (!gitURL || !gitUrlPattern.test(gitURL)) {
     toast.error('Please enter a valid GitHub repository URL');
     return;
   }
    

    try {
      const response = await axios.post("http://89.116.34.246:6100/project", {
        gitURL,
        slug,
      });
      toast.success('Deployment Started');

      const redata = response.data.data;
      console.log(redata);
      
      // const projectId = projectSlug;
      // console.log(projectId);
      
      onProjectIdReceived(redata.projectSlug);
      setProjectID(redata.projectSlug)
      setDeployedURL(redata.url);
      setloading(true);
       // Pass projectId to parent component

      // Handle success - maybe show a success message
    } catch (error) {
      toast.error("AWS ECS have reached its limit, Issue from server end")
      console.error("Error deploying project:", error);
      // Handle error - maybe show an error message
    }
  };

  return (
    <Card className="w-full">
      
      <Toaster/>
      <CardHeader>
        <CardTitle>Deploy your Project</CardTitle>
        <CardDescription>Deploy your new project in one-click.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="Name of your project"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="gitUrl">Github</Label>
              <Input
                id="gitUrl"
                placeholder="Github URL of your project"
                value={gitURL}
                onChange={(e) => setGitUrl(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="framework">Framework</Label>
              <Select>
                <SelectTrigger id="framework">
                  <SelectValue
                    placeholder="Select"/>
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="next">Next.js</SelectItem>
                  <SelectItem value="react">React</SelectItem>
                  <SelectItem value="react-vite">React-Vite</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="slug">Project Slug</Label>
              <Input
                id="slug"
                placeholder="Slug of your project"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
              />
            </div>
          </div>

         { loading ?  ( <CardDemo projectURL={deployedURL} projectId={projectID}/>):( <CardFooter className="flex justify-between mt-4">
            <Button variant="outline">Cancel</Button>
            <Button type="submit" disabled={loading}>Deploy</Button>
          </CardFooter>)}
         
        </form>
      </CardContent>
    </Card>
  );
};

export default DeplyForm;

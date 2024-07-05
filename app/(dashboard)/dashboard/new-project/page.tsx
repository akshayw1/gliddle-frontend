"use client"
import { CalendarDateRangePicker } from '@/components/date-range-picker';
import  DeplyForm  from '@/components/deploy';
import { Overview } from '@/components/overview';
import { LiveLogs } from '@/components/recent-sales';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import BreadCrumb from '@/components/breadcrumb';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';


const breadcrumbItems = [{ title: 'New Project', link: '/dashboard/new-project' }];

export default function page() {
  const [projectId, setProjectId] = useState<string>("");

  console.log("hello",projectId);
   

  const handleProjectIdReceived = (projectId: string) => {
    setProjectId(projectId);
    // Handle projectId received from DeplyForm
  };

  return (
    <ScrollArea className="h-full">
         
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <BreadCrumb items={breadcrumbItems} />
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">
            Hi, Welcome back 👋
          </h2>
          <div className="hidden items-center space-x-2 md:flex">
            {/* <CalendarDateRangePicker /> */}
            <Button>Report Bug</Button>
            <Button>Refresh</Button>
          </div>
        </div>
        <Tabs defaultValue="overview" className="space-y-4">
        
          <TabsContent value="overview" className="space-y-4">
           
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Deploy App</CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                  {/* <Overview /> */}
                  <DeplyForm onProjectIdReceived={handleProjectIdReceived}/>
                </CardContent>
              </Card>
              <Card className="col-span-4 md:col-span-3">
                <CardHeader>
                  <CardTitle>Deployment Logs</CardTitle>
                  <CardDescription>
                    Below are the Deployment logs for #21e2e1
                  </CardDescription>
                </CardHeader>
                <CardContent>
                 {projectId ?  <LiveLogs projectId={projectId} /> : <div className='flex  items-center flex-col justify-center text-center '>
                  <div className='text-4xl bfont-bold'>
                  <CardDescription>
                    Ready for Deployment
                  </CardDescription>
                    </div>
                 <img
          src="https://cdni.iconscout.com/illustration/premium/thumb/aged-man-working-on-laptop-5668653-4724003.png?f=webp"
          alt="Empty state"
          className="mx-auto h-1/2 w-1/2 justify-center align-middle text-center mt-[4rem]"
        />
                  </div>}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </ScrollArea>
  );
}

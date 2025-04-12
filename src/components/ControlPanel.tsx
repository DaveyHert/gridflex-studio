import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FlexboxControls from "./FlexboxControls";
import GridControls from "./GridControls";
import { useLayout } from "@/context/LayoutContext";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { templates } from "@/utils/templates";
import { Clock, Save, Trash2 } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

const ControlPanel: React.FC = () => {
  const {
    layoutType,
    savedLayouts,
    saveCurrentLayout,
    loadLayout,
    deleteLayout,
    loadTemplate,
  } = useLayout();

  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const [layoutName, setLayoutName] = useState("");

  const handleSaveLayout = () => {
    if (layoutName.trim()) {
      saveCurrentLayout(layoutName);
      setLayoutName("");
      setSaveDialogOpen(false);
    }
  };

  return (
    <div className="w-[350px] bg-card border-r border-border flex flex-col h-full">
      <Tabs defaultValue="properties">
        <TabsList className="w-full grid grid-cols-3 border-b border-border rounded-none">
          <TabsTrigger value="properties">Properties</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="saved">Saved</TabsTrigger>
        </TabsList>

        <ScrollArea
          className="flex-1 p-4 custom-scrollbar"
          style={{ height: "calc(100vh - 110px)" }}
        >
          <TabsContent value="properties" className="m-0 p-0">
            {layoutType === "flexbox" ? <FlexboxControls /> : <GridControls />}
          </TabsContent>

          <TabsContent value="templates" className="m-0 p-0">
            <div className="mb-4">
              <h2 className="text-lg font-semibold mb-3">
                Pre-built Templates
              </h2>
              <p className="text-sm text-muted-foreground mb-4">
                Load a pre-built template to quickly get started with common
                layout patterns.
              </p>
            </div>

            <div className="space-y-4">
              {templates.map((template) => (
                <Card key={template.id} className="bg-muted">
                  <CardContent className="pt-4">
                    <h3 className="font-medium">{template.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {template.description}
                    </p>
                  </CardContent>
                  <CardFooter className="pb-3 justify-end">
                    <Button
                      size="sm"
                      onClick={() => loadTemplate(template.state)}
                    >
                      Load Template
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="saved" className="m-0 p-0">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Saved Layouts</h2>
              <Dialog open={saveDialogOpen} onOpenChange={setSaveDialogOpen}>
                <DialogTrigger asChild>
                  <Button size="sm" variant="outline">
                    <Save className="h-4 w-4 mr-1" />
                    Save Current
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Save Current Layout</DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="name">Layout Name</Label>
                      <Input
                        id="name"
                        value={layoutName}
                        onChange={(e) => setLayoutName(e.target.value)}
                        placeholder="My awesome layout"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit" onClick={handleSaveLayout}>
                      Save
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            {savedLayouts.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <p>No saved layouts yet.</p>
                <p className="text-sm mt-2">
                  Save your current layout to access it later.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {savedLayouts.map((layout) => (
                  <Card key={layout.id} className="bg-muted">
                    <CardContent className="pt-4">
                      <div className="flex justify-between items-start">
                        <h3 className="font-medium">{layout.name}</h3>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 text-muted-foreground hover:text-destructive"
                          onClick={() => deleteLayout(layout.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="flex items-center mt-2 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3 mr-1" />
                        <span>
                          {formatDistanceToNow(new Date(layout.createdAt), {
                            addSuffix: true,
                          })}
                        </span>
                      </div>
                    </CardContent>
                    <CardFooter className="pb-3 justify-end">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => loadLayout(layout)}
                      >
                        Load
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </ScrollArea>
      </Tabs>
    </div>
  );
};

export default ControlPanel;

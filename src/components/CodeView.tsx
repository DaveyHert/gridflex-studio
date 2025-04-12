import React, { useState } from "react";
import { useLayout } from "@/context/LayoutContext";
import { generateHTML, generateCSS } from "@/utils/generateCode";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Check, Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const CodeView: React.FC = () => {
  const { layoutType, flexboxProps, gridProps, flexItems, gridItems } =
    useLayout();
  const [activeCodeTab, setActiveCodeTab] = useState<"html" | "css">("html");
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const htmlCode = generateHTML(layoutType, flexItems, gridItems);
  const cssCode = generateCSS(
    layoutType,
    flexboxProps,
    gridProps,
    flexItems,
    gridItems
  );

  const copyToClipboard = () => {
    const codeToCopy = activeCodeTab === "html" ? htmlCode : cssCode;

    navigator.clipboard
      .writeText(codeToCopy)
      .then(() => {
        setCopied(true);
        toast({
          title: "Copied to clipboard",
          description: `${activeCodeTab.toUpperCase()} code copied to clipboard.`,
          duration: 2000,
        });

        setTimeout(() => setCopied(false), 2000);
      })
      .catch((err) => {
        console.error("Failed to copy:", err);
        toast({
          title: "Copy failed",
          description: "Failed to copy code to clipboard.",
          variant: "destructive",
        });
      });
  };

  return (
    <div className="flex flex-col h-full">
      <div className="bg-card rounded-lg border border-border p-4 h-full m-6">
        <div className="flex justify-between items-center mb-4">
          <Tabs
            value={activeCodeTab}
            onValueChange={(value) => setActiveCodeTab(value as "html" | "css")}
            className="w-auto"
          >
            <TabsList>
              <TabsTrigger value="html" className="text-xs">
                HTML
              </TabsTrigger>
              <TabsTrigger value="css" className="text-xs">
                CSS
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <Button
            variant="outline"
            size="sm"
            onClick={copyToClipboard}
            className="text-xs"
          >
            {copied ? (
              <>
                <Check className="h-3 w-3 mr-1" />
                Copied
              </>
            ) : (
              <>
                <Copy className="h-3 w-3 mr-1" />
                Copy {activeCodeTab.toUpperCase()}
              </>
            )}
          </Button>
        </div>

        <ScrollArea className="bg-background p-4 rounded h-[calc(100%-48px)] custom-scrollbar">
          <pre className="code-font text-sm text-foreground whitespace-pre-wrap">
            <code>{activeCodeTab === "html" ? htmlCode : cssCode}</code>
          </pre>
        </ScrollArea>
      </div>
    </div>
  );
};

export default CodeView;

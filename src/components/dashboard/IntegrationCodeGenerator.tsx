import React, { useState } from 'react';
import { Check, Copy, Download, ChevronDown } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface IntegrationCodeGeneratorProps {
  widgets?: Array<{
    id: string;
    name: string;
  }>;
}

const IntegrationCodeGenerator = ({ widgets = [
  { id: '1', name: 'Customer Support Widget' },
  { id: '2', name: 'Product Assistant' },
  { id: '3', name: 'Knowledge Base Helper' }
] }: IntegrationCodeGeneratorProps) => {
  const [selectedWidget, setSelectedWidget] = useState(widgets[0]?.id || '');
  const [integrationType, setIntegrationType] = useState('javascript');
  const [copied, setCopied] = useState(false);

  const integrationTypes = [
    { value: 'javascript', label: 'JavaScript' },
    { value: 'react', label: 'React' },
    { value: 'vue', label: 'Vue.js' },
    { value: 'angular', label: 'Angular' }
  ];

  const getIntegrationCode = (type: string, widgetId: string) => {
    const widget = widgets.find(w => w.id === widgetId);
    
    switch (type) {
      case 'javascript':
        return `<!-- AI Chat Widget Integration -->
<script>
  (function(w, d, s, o) {
    w.AIChatWidget = o;
    var js = d.createElement(s);
    js.src = 'https://cdn.example.com/widget/${widgetId}.js';
    js.async = 1;
    js.onload = function() {
      w.AIChatWidget.init({
        widgetId: '${widgetId}',
        position: 'bottom-right'
      });
    };
    d.getElementsByTagName('head')[0].appendChild(js);
  })(window, document, 'script', window.AIChatWidget || {});
</script>`;
      
      case 'react':
        return `// Install our package first
// npm install ai-chat-widget-react

import { AIChatWidget } from 'ai-chat-widget-react';

function App() {
  return (
    <div className="your-app">
      {/* Your app content */}
      
      <AIChatWidget 
        widgetId="${widgetId}"
        position="bottom-right"
        theme="light"
      />
    </div>
  );
}`;
      
      case 'vue':
        return `<!-- Install our package first -->
<!-- npm install ai-chat-widget-vue -->

<template>
  <div class="your-app">
    <!-- Your app content -->
    
    <AIChatWidget 
      widget-id="${widgetId}"
      position="bottom-right"
      theme="light"
    />
  </div>
</template>

<script>
import { AIChatWidget } from 'ai-chat-widget-vue';

export default {
  components: {
    AIChatWidget
  }
}
</script>`;
      
      case 'angular':
        return `// Install our package first
// npm install ai-chat-widget-angular

// In your component file
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="your-app">
      <!-- Your app content -->
      
      <ai-chat-widget
        [widgetId]="'${widgetId}'"
        [position]="'bottom-right'"
        [theme]="'light'">
      </ai-chat-widget>
    </div>
  `
})
export class AppComponent {}

// Don't forget to import the module in your app.module.ts
// import { AIChatWidgetModule } from 'ai-chat-widget-angular';`;
      
      default:
        return '// Select a widget and integration type to generate code';
    }
  };

  const handleCopyCode = () => {
    const code = getIntegrationCode(integrationType, selectedWidget);
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadCode = () => {
    const code = getIntegrationCode(integrationType, selectedWidget);
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ai-chat-widget-${integrationType}-integration.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const selectedWidgetName = widgets.find(w => w.id === selectedWidget)?.name || 'Select a widget';

  return (
    <div className="bg-background p-6 w-full">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Integration Code Generator</h1>
        <p className="text-muted-foreground mt-2">
          Generate code snippets to integrate your AI chat widgets into any website or application.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-12">
        <div className="md:col-span-4 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Widget Selection</CardTitle>
              <CardDescription>Choose the widget you want to integrate</CardDescription>
            </CardHeader>
            <CardContent>
              <Select value={selectedWidget} onValueChange={setSelectedWidget}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a widget">{selectedWidgetName}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {widgets.map((widget) => (
                    <SelectItem key={widget.id} value={widget.id}>{widget.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Integration Type</CardTitle>
              <CardDescription>Select your preferred integration method</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={integrationType} onValueChange={setIntegrationType} className="w-full">
                <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full">
                  {integrationTypes.map((type) => (
                    <TabsTrigger key={type.value} value={type.value}>{type.label}</TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </CardContent>
          </Card>

          <Alert>
            <AlertDescription>
              After integrating the widget, you can customize its appearance and behavior from the Widget Manager.
            </AlertDescription>
          </Alert>
        </div>

        <div className="md:col-span-8">
          <Card className="h-full flex flex-col">
            <CardHeader>
              <CardTitle>Integration Code</CardTitle>
              <CardDescription>
                Copy and paste this code into your website or application
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="relative">
                <pre className="bg-muted p-4 rounded-md overflow-auto h-[400px] text-sm">
                  <code>{getIntegrationCode(integrationType, selectedWidget)}</code>
                </pre>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t pt-6">
              <div className="text-sm text-muted-foreground">
                Widget ID: {selectedWidget}
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" onClick={handleDownloadCode}>
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
                <Button onClick={handleCopyCode}>
                  {copied ? (
                    <>
                      <Check className="mr-2 h-4 w-4" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="mr-2 h-4 w-4" />
                      Copy Code
                    </>
                  )}
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default IntegrationCodeGenerator;

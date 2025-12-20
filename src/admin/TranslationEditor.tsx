import React, { useState, useEffect, useCallback } from "react";
import client from "../api/client";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { Button } from "../components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Loader2, Save, Search, AlertCircle, ChevronRight, ChevronDown, Check } from "lucide-react";
import { Input } from "../components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { cn } from "../components/ui/utils";

// Types for our tree structure
type TranslationValue = string | TranslationObject;
interface TranslationObject {
  [key: string]: TranslationValue;
}

interface TreeItemProps {
  path: string[];
  data: TranslationValue;
  searchQuery: string;
  onUpdate: (path: string[], value: string) => void;
  level?: number;
}

const TreeItem: React.FC<TreeItemProps> = ({ path, data, searchQuery, onUpdate, level = 0 }) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(true); // Default open to see content
  const key = path[path.length - 1];
  const isObject = typeof data === 'object' && data !== null;
  const isMatch = searchQuery && key.toLowerCase().includes(searchQuery.toLowerCase());
  
  // If searching, auto-expand if children match
  const hasMatchingChildren = useCallback((obj: TranslationObject): boolean => {
    return Object.entries(obj).some(([k, v]) => {
      if (k.toLowerCase().includes(searchQuery.toLowerCase())) return true;
      if (typeof v === 'string' && v.toLowerCase().includes(searchQuery.toLowerCase())) return true;
      if (typeof v === 'object' && v !== null) return hasMatchingChildren(v);
      return false;
    });
  }, [searchQuery]);

  const shouldShow = !searchQuery || isMatch || (isObject && hasMatchingChildren(data));

  if (!shouldShow) return null;

  return (
    <div className={cn("flex flex-col", level > 0 && "ml-4 border-l border-border/40 pl-4")}>
      <div className="flex items-start py-2 group">
        {isObject ? (
          <div className="flex-1">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center gap-2 font-medium text-foreground hover:text-primary transition-colors text-left"
            >
              {isOpen ? <ChevronDown className="h-4 w-4 opacity-50" /> : <ChevronRight className="h-4 w-4 opacity-50" />}
              <span className={cn(isMatch && "bg-yellow-100 dark:bg-yellow-900/30 px-1 rounded")}>{key}</span>
              <Badge variant="outline" className="text-[10px] h-5 px-1.5 text-muted-foreground font-normal">
                {Object.keys(data).length} {t('admin.translation_editor.items')}
              </Badge>
            </button>
            
            {isOpen && (
              <div className="mt-1 space-y-1">
                {Object.entries(data).map(([childKey, childValue]) => (
                  <TreeItem 
                    key={childKey} 
                    path={[...path, childKey]} 
                    data={childValue} 
                    searchQuery={searchQuery}
                    onUpdate={onUpdate}
                    level={level + 1}
                  />
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="flex-1 grid grid-cols-[200px_1fr] gap-4 items-center">
             <div className="text-sm font-medium text-muted-foreground truncate" title={key}>
                <span className={cn(isMatch && "bg-yellow-100 dark:bg-yellow-900/30 px-1 rounded")}>{key}</span>
             </div>
             <Input 
                value={data as string} 
                onChange={(e) => onUpdate(path, e.target.value)}
                className="h-9 font-sans"
             />
          </div>
        )}
      </div>
    </div>
  );
};

export default function TranslationEditor() {
  const { t } = useTranslation();
  const [lang, setLang] = useState("ru");
  const [data, setData] = useState<TranslationObject>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  useEffect(() => {
    fetchTranslations(lang);
  }, [lang]);

  // Warn before leaving with unsaved changes
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = '';
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [hasUnsavedChanges]);

  const fetchTranslations = async (language: string) => {
    setIsLoading(true);
    try {
      const response = await client.get(`/translations/${language}`);
      setData(response.data);
      setHasUnsavedChanges(false);
    } catch (error) {
      toast.error(t('admin.translation_editor.load_error'));
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdate = (path: string[], value: string) => {
    setData(prevData => {
      const newData = JSON.parse(JSON.stringify(prevData)); // Deep clone
      let current = newData;
      for (let i = 0; i < path.length - 1; i++) {
        current = current[path[i]];
      }
      current[path[path.length - 1]] = value;
      return newData;
    });
    setHasUnsavedChanges(true);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await client.post(`/translations/${lang}`, data);
      toast.success(t('admin.translation_editor.save_success'));
      setHasUnsavedChanges(false);
    } catch (error) {
      toast.error(t('admin.translation_editor.save_error'));
      console.error(error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6 h-[calc(100vh-4rem)] flex flex-col">
      <div className="flex items-center justify-between shrink-0">
        <div>
           <h1 className="text-3xl font-bold tracking-tight">{t('admin.translation_editor.title')}</h1>
           <p className="text-muted-foreground mt-1">{t('admin.translation_editor.subtitle')}</p>
        </div>
        <div className="flex items-center gap-3">
          {hasUnsavedChanges && (
            <span className="text-sm text-yellow-600 dark:text-yellow-500 font-medium flex items-center gap-2 bg-yellow-100 dark:bg-yellow-900/20 px-3 py-1.5 rounded-full animate-in fade-in">
              <AlertCircle className="w-4 h-4" />
              {t('admin.translation_editor.unsaved_changes')}
            </span>
          )}
          <Button onClick={handleSave} disabled={isSaving || isLoading || !hasUnsavedChanges} size="lg" className="min-w-[140px]">
            {isSaving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {t('admin.translation_editor.saving')}
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                {t('admin.translation_editor.save_changes')}
              </>
            )}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-[250px_1fr] gap-6 flex-1 min-h-0">
        {/* Sidebar Controls */}
        <div className="space-y-6">
            <Card>
                <CardHeader className="pb-3">
                    <CardTitle className="text-base">{t('admin.translation_editor.language')}</CardTitle>
                </CardHeader>
                <CardContent>
                    <Tabs value={lang} onValueChange={(v) => {
                        if (hasUnsavedChanges) {
                            if (confirm(t('admin.translation_editor.discard_confirm'))) {
                                setLang(v);
                            }
                        } else {
                            setLang(v);
                        }
                    }} className="w-full">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="ru">{t('admin.translation_editor.russian')}</TabsTrigger>
                            <TabsTrigger value="en">{t('admin.translation_editor.english')}</TabsTrigger>
                        </TabsList>
                    </Tabs>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="pb-3">
                    <CardTitle className="text-base">{t('admin.translation_editor.search_title')}</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input 
                            placeholder={t('admin.translation_editor.search_placeholder')}
                            className="pl-9"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </CardContent>
            </Card>
            
            <div className="bg-blue-50 dark:bg-blue-900/10 p-4 rounded-xl text-sm text-blue-700 dark:text-blue-300 border border-blue-100 dark:border-blue-800">
                <h4 className="font-semibold mb-1 flex items-center gap-2">
                    <Check className="w-4 h-4" />
                    {t('admin.translation_editor.pro_tip')}
                </h4>
                <p>{t('admin.translation_editor.pro_tip_desc')}</p>
            </div>
        </div>

        {/* Main Editor Area */}
        <Card className="flex flex-col overflow-hidden shadow-sm border-muted h-full">
            <CardHeader className="border-b bg-muted/30 py-4">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-medium flex items-center gap-2">
                        {lang === 'ru' ? t('admin.translation_editor.ru_translations') : t('admin.translation_editor.en_translations')}
                    </CardTitle>
                    <Badge variant="secondary">
                        {Object.keys(data).length} {t('admin.translation_editor.sections')}
                    </Badge>
                </div>
            </CardHeader>
            <CardContent className="flex-1 overflow-y-auto p-0">
                {isLoading ? (
                    <div className="h-full flex items-center justify-center flex-col gap-4 text-muted-foreground">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                        <p>{t('admin.translation_editor.loading')}</p>
                    </div>
                ) : (
                    <div className="p-6">
                        {Object.keys(data).length === 0 ? (
                            <div className="text-center py-20 text-muted-foreground">
                                {t('admin.translation_editor.no_translations')}
                            </div>
                        ) : (
                            <div className="space-y-1">
                                {Object.entries(data).map(([key, value]) => (
                                    <TreeItem 
                                        key={key} 
                                        path={[key]} 
                                        data={value} 
                                        searchQuery={searchQuery}
                                        onUpdate={handleUpdate}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </CardContent>
        </Card>
      </div>
    </div>
  );
}

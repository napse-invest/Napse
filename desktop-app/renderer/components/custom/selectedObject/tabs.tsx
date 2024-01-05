import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

type Tab = {
  name: string
  content: JSX.Element
}

export default function TabsLayout({
  tabs,
  settingsTab
}: {
  tabs?: Tab[]
  settingsTab: JSX.Element
}): JSX.Element {
  const defaultTab = tabs ? tabs[0].name : 'settings'
  return (
    <Tabs defaultValue={defaultTab}>
      <TabsList>
        {tabs?.map((tab, index) => (
          <TabsTrigger key={index} value={tab.name}>
            {tab.name}
          </TabsTrigger>
        ))}
        <TabsTrigger value={'settings'}>Settings</TabsTrigger>
      </TabsList>
      {tabs?.map((tab, index) => (
        <TabsContent key={index} value={tab.name}>
          {tab.content}
        </TabsContent>
      ))}
      <TabsContent value={'settings'}>{settingsTab}</TabsContent>
    </Tabs>
  )
}

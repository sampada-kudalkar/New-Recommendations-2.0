import L1 from './L1'
import L2 from './L2'
import Header from './Header'

export default function AppShell({
  children,
  title,
  showInfoIcon = false,
  headerRight,
  onBack,
  showL2 = true,
  rightPanel,
}: {
  children: React.ReactNode
  title: string
  showInfoIcon?: boolean
  headerRight?: React.ReactNode
  onBack?: () => void
  showL2?: boolean
  rightPanel?: React.ReactNode
}) {
  return (
    <div className="flex h-screen overflow-hidden bg-white font-roboto">
      <L1 />
      {showL2 && <L2 />}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <Header
          title={title}
          showInfoIcon={showInfoIcon}
          headerRight={headerRight}
          onBack={onBack}
        />
        <main className="flex flex-col flex-1 min-h-0 overflow-hidden">
          {children}
        </main>
      </div>
      {rightPanel}
    </div>
  )
}

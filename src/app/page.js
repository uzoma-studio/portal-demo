// Import various templates
import Islands from '../../templates/islands/layout'
import Windows from '../../templates/windows/layout'

export default function Home() {

  // Index templates
  const templates = {
    islands: <Islands />,
    windows: <Windows />
  }

  const activeTemplate = templates.windows

  return (
    <div>
      {activeTemplate}
    </div>
  );
}

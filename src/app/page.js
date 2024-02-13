import Islands from '../../templates/islands/layout'

export default function Home() {

  const templates = {
    islands: <Islands />
  }

  const activeTemplate = templates.islands

  return (
    <div>
      {activeTemplate}
    </div>
  );
}

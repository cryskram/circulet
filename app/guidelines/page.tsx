export default function GuidelinesPage() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-800">
      <div className="mx-auto max-w-3xl space-y-10 px-6 py-12">
        <h1 className="text-3xl font-semibold text-slate-900 dark:text-slate-100">
          Community Guidelines
        </h1>

        <section className="space-y-4 text-slate-700 dark:text-slate-300">
          <p>
            Circulet is built on trust within a college community. Please follow
            these guidelines to keep the platform safe and useful for everyone.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-medium text-slate-900 dark:text-slate-100">
            Payments & Transactions
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Circulet does not handle payments or money transfers. All
            transactions happen directly between users. Verify details carefully
            before paying or handing over items.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-medium text-slate-900 dark:text-slate-100">
            Safety & Responsibility
          </h2>
          <ul className="list-disc space-y-1 pl-5 text-sm text-slate-600 dark:text-slate-400">
            <li>Meet in public or campus-approved places</li>
            <li>Inspect items before paying</li>
            <li>Do not share sensitive personal information</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="font-medium text-slate-900 dark:text-slate-100">
            Prohibited Usage
          </h2>
          <ul className="list-disc space-y-1 pl-5 text-sm text-slate-600 dark:text-slate-400">
            <li>No scams or misleading listings</li>
            <li>No illegal or prohibited items</li>
            <li>No impersonation or harassment</li>
          </ul>
        </section>
      </div>
    </main>
  );
}

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-800">
      <div className="mx-auto max-w-3xl space-y-10 px-6 py-12">
        <header className="space-y-3">
          <h1 className="text-3xl font-semibold text-slate-900 dark:text-slate-100">
            About Circulet
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            A campus-first marketplace built by students, for students.
          </p>
        </header>

        <section className="space-y-4 leading-relaxed text-slate-700 dark:text-slate-300">
          <p>
            Circulet is a student-driven platform designed to help college
            students buy, sell, rent, or give away items within their own campus
            community.
          </p>

          <p>
            From textbooks and calculators to furniture and gadgets; Circulet
            connects students who already have things with those who need them.
          </p>

          <p>
            The goal is simple: reduce waste, save money, and make campus life
            easier.
          </p>
        </section>

        <section className="rounded-lg border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-900">
          <h2 className="mb-3 font-medium text-slate-900 dark:text-slate-100">
            What Circulet is NOT
          </h2>
          <ul className="list-disc space-y-2 pl-5 text-sm text-slate-600 dark:text-slate-400">
            <li>It does not process payments</li>
            <li>It does not take commissions</li>
            <li>It is not a delivery service</li>
            <li>It does not guarantee transactions</li>
          </ul>
        </section>
      </div>
    </main>
  );
}

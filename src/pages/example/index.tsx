import { Button } from "@/components/ui/button";
import { ToolPageFooter, ToolPageHeader, ToolPageLayout, ToolPageMain } from "@/layouts/ToolPageLayout";

export function ToolExamplePage() {
  return (
    <ToolPageLayout>
      <ToolPageHeader toolName="Gerador de senha" />
      <ToolPageMain>
        <section className="w-full rounded-xl border border-border bg-card p-6 md:p-10">
          <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Ferramenta</p>
          <h1 className="mt-3 text-3xl font-extrabold uppercase text-foreground md:text-5xl">Gerador de senha</h1>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-muted-foreground md:text-base">
            Uma página simples de exemplo para ferramentas Kriathus, com cabeçalho fixo, área principal e rodapé padrão.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {["Rápido", "Seguro", "Responsivo"].map((item) => (
              <div key={item} className="rounded-xl border border-border bg-muted/40 p-4">
                <h2 className="text-sm font-bold uppercase text-foreground">{item}</h2>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">Bloco de conteúdo reservado para apresentar a ferramenta.</p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button>Começar</Button>
            <Button variant="secondary">Saiba mais</Button>
          </div>
        </section>
      </ToolPageMain>
      <ToolPageFooter />
    </ToolPageLayout>
  );
}

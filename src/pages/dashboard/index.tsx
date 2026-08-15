import { Activity, ArrowRight, CreditCard, Rocket, ShieldCheck, Sparkles, Users } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { StatusBadge } from "@/components/common/StatusBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SearchableSelect } from "@/components/ui/searchable-select";
import { Select } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { MetricCard } from "@/components/dashboard/MetricCard";

const metrics = [
  {
    title: "Receita recorrente",
    value: "R$ 84,2k",
    change: "+18%",
    icon: CreditCard,
  },
  {
    title: "Usuários ativos",
    value: "12.480",
    change: "+9%",
    icon: Users,
  },
  {
    title: "Automações",
    value: "326",
    change: "+27%",
    icon: Sparkles,
  },
  {
    title: "Saúde do sistema",
    value: "99,9%",
    change: "OK",
    icon: ShieldCheck,
    status: "info" as const,
  },
];

const quickActions = ["Novo produto", "Criar campanha", "Conectar API", "Emitir relatório"];
const productOptions = [
  { label: "Kriathus SaaS Core", value: "kriathus-saas-core" },
  { label: "Lead Magnet Engine", value: "lead-magnet-engine" },
  { label: "Internal Ops Hub", value: "internal-ops-hub" },
  { label: "Billing Automation", value: "billing-automation" },
  { label: "Growth Console", value: "growth-console" },
];

const inputFields = [
  { id: "name", label: "Nome", type: "text", placeholder: "Kriathus Core" },
  { id: "email", label: "Email", type: "email", placeholder: "contato@kriathus.com" },
  { id: "password", label: "Senha", type: "password", placeholder: "••••••••" },
  { id: "phone", label: "Telefone", type: "tel", placeholder: "+55 11 90000-0000" },
  { id: "url", label: "URL", type: "url", placeholder: "https://kriathus.com" },
  { id: "search", label: "Busca", type: "search", placeholder: "Buscar projeto" },
  { id: "number", label: "Valor", type: "number", placeholder: "84000" },
  { id: "date", label: "Data", type: "date" },
  { id: "time", label: "Hora", type: "time" },
  { id: "file", label: "Arquivo", type: "file" },
];

export function DashboardPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Command Center"
        title="Dashboard"
        description="Visão executiva para monitorar performance, crescimento e operações dos produtos digitais Kriathus."
        actions={
          <>
            <Button variant="secondary">Exportar</Button>
            <Button>
              <Rocket className="h-4 w-4" />
              Criar projeto
            </Button>
          </>
        }
      />

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => (
          <MetricCard key={metric.title} {...metric} />
        ))}
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.4fr_0.9fr]">
        <div className="rounded-xl border border-border bg-card p-6">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Pipeline</p>
              <h2 className="mt-2 text-xl font-extrabold uppercase text-foreground">Produtos em evolução</h2>
            </div>
            <StatusBadge variant="success">Operando</StatusBadge>
          </div>
          <div className="mt-6 space-y-3">
            {["Kriathus SaaS Core", "Lead Magnet Engine", "Internal Ops Hub"].map((product, index) => (
              <div key={product} className="flex items-center justify-between gap-4 rounded-xl border border-border bg-muted/40 p-4">
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-foreground">{product}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{index === 0 ? "Deploy em produção" : index === 1 ? "Validação de oferta" : "Automação interna"}</p>
                </div>
                <div className="h-2 w-24 overflow-hidden rounded-full bg-muted">
                  <div className="h-full rounded-full bg-brand-gradient" style={{ width: `${86 - index * 18}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-6">
          <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Ações rápidas</p>
          <div className="mt-5 grid gap-3">
            {quickActions.map((action) => (
              <button
                key={action}
                className="flex items-center justify-between rounded-xl border border-border bg-muted/40 px-4 py-3 text-left text-sm font-medium text-foreground transition hover:bg-muted"
                type="button"
              >
                {action}
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </button>
            ))}
          </div>
          <div className="mt-6 rounded-xl border border-cyan-600/20 bg-cyan-500/10 p-4 dark:border-cyan-400/20 dark:bg-cyan-400/10">
            <div className="flex items-center gap-3 text-cyan-800 dark:text-cyan-200">
              <Activity className="h-5 w-5" />
              <p className="text-sm font-semibold">Infraestrutura estável</p>
            </div>
            <p className="mt-2 text-sm leading-6 text-cyan-900/75 dark:text-cyan-100/70">Todas as rotas críticas estão respondendo dentro da janela esperada.</p>
          </div>
        </div>
      </section>

      <section className="rounded-xl border border-border bg-card p-6">
        <div className="flex flex-col gap-2">
          <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Formulários</p>
          <h2 className="text-xl font-extrabold uppercase text-foreground">Campos de input</h2>
        </div>

        <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {inputFields.map((field) => (
            <div key={field.id} className="space-y-2">
              <Label htmlFor={field.id}>{field.label}</Label>
              <Input id={field.id} type={field.type} placeholder={field.placeholder} />
            </div>
          ))}

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select id="status" defaultValue="active">
              <option value="active">Ativo</option>
              <option value="paused">Pausado</option>
              <option value="draft">Rascunho</option>
            </Select>
          </div>

          <div className="space-y-2 md:col-span-2 xl:col-span-3">
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id="description"
              placeholder="Descreva o objetivo, contexto ou observações do projeto."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="product-search">Select com busca</Label>
            <SearchableSelect id="product-search" options={productOptions} searchPlaceholder="Buscar produto" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="alerts-switch">Alertas</Label>
            <div className="flex h-11 items-center justify-between rounded-xl border border-border bg-muted/40 px-4 text-sm font-medium text-foreground">
              Receber alertas operacionais
              <Switch id="alerts-switch" defaultChecked />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

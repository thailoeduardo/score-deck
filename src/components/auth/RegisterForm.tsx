import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Loader2, Lock, Mail, User } from "lucide-react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { routesConfig } from "@/config/routes.config";
import { registerSchema, type RegisterSchema } from "@/schemas/register.schema";
import { getErrorMessage, register as apiRegister } from "@/lib/api";
import { useAuthStore } from "@/store/authStore";

type RegisterFormProps = {
  className?: string;
};

export function RegisterForm({ className }: RegisterFormProps) {
  const navigate = useNavigate();
  const setAuth = useAuthStore((s) => s.setAuth);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: RegisterSchema) => {
    try {
      const data = await apiRegister(values);
      setAuth(data.token, data.user);
      toast.success("Conta criada com sucesso!");
      navigate(routesConfig.app.home);
    } catch (error: unknown) {
      toast.error(getErrorMessage(error, "Erro ao criar conta. Tente novamente."));
    }
  };

  return (
    <form className={className} onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="name">Nome Completo</Label>
          <div className="relative">
            <User className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input id="name" type="text" placeholder="Seu Nome" className="pl-11" autoComplete="name" {...register("name")} />
          </div>
          {errors.name ? <p className="text-xs font-semibold text-destructive">{errors.name.message}</p> : null}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <div className="relative">
            <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input id="email" type="email" placeholder="voce@scoredeck.com" className="pl-11" autoComplete="email" {...register("email")} />
          </div>
          {errors.email ? <p className="text-xs font-semibold text-destructive">{errors.email.message}</p> : null}
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Senha</Label>
          <div className="relative">
            <Lock className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input id="password" type="password" placeholder="••••••••" className="pl-11" autoComplete="new-password" {...register("password")} />
          </div>
          {errors.password ? <p className="text-xs font-semibold text-destructive">{errors.password.message}</p> : null}
        </div>
      </div>

      <Button type="submit" className="mt-7 w-full" disabled={isSubmitting}>
        {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <ArrowRight className="h-4 w-4" />}
        Criar Conta
      </Button>
    </form>
  );
}

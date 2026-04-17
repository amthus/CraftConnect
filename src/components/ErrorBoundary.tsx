import React, { Component, ErrorInfo, ReactNode } from 'react';
import { motion } from 'motion/react';
import { AlertCircle, RefreshCw, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false
    };
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-sand flex items-center justify-center p-6 font-sans">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-lg glass p-10 rounded-[2.5rem] border border-terracotta/10 text-center space-y-8 shadow-2xl"
          >
            <div className="h-20 w-20 bg-red-500/10 rounded-full flex items-center justify-center mx-auto">
              <AlertCircle size={40} className="text-red-500" />
            </div>
            <div className="space-y-4">
              <h1 className="text-4xl font-heading text-foreground">Oups, un souffle s'est perdu...</h1>
              <p className="text-muted-foreground font-serif italic text-lg leading-relaxed">
                "Même les plus grands maîtres artisans font parfois face à l'imprévisible. Nous n'avons pas pu charger cette œuvre."
              </p>
            </div>
            
            {this.state.error && (
              <div className="bg-black/5 p-4 rounded-xl text-left border border-black/5 overflow-hidden">
                <p className="text-[10px] uppercase font-black opacity-40 mb-2 tracking-widest">Détails techniques</p>
                <code className="text-[11px] block text-red-600/70 font-mono break-all line-clamp-2">
                  {this.state.error.message}
                </code>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={() => window.location.reload()}
                className="flex-1 h-14 bg-terracotta text-white rounded-full text-xs uppercase font-black tracking-widest shadow-xl group"
              >
                <RefreshCw size={14} className="mr-2 group-hover:rotate-180 transition-transform duration-500" />
                Réessayer
              </Button>
              <Button 
                variant="outline"
                onClick={() => window.location.href = '/'}
                className="flex-1 h-14 glass border-terracotta/20 rounded-full text-xs uppercase font-black tracking-widest"
              >
                <Home size={14} className="mr-2" />
                Retour Accueil
              </Button>
            </div>
          </motion.div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

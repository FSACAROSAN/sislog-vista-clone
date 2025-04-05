
import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Pais } from '@/types/pais';
import PaisForm from '@/components/paises/PaisForm';
import { 
  Map, 
  Plus, 
  Pencil, 
  Trash2, 
  Search, 
  ArrowUpDown
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Input } from '@/components/ui/input';

const PaisesPage: React.FC = () => {
  const [paises, setPaises] = useState<Pais[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPais, setSelectedPais] = useState<Pais | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const fetchPaises = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('paises')
        .select('*')
        .order('nombre_es', { ascending: true });

      if (error) throw error;
      
      setPaises(data as Pais[]);
    } catch (error: any) {
      console.error('Error fetching paises:', error);
      toast({
        title: 'Error',
        description: error.message || 'Error al cargar los países',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('paises')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: 'Éxito',
        description: 'País eliminado correctamente',
      });
      fetchPaises();
    } catch (error: any) {
      console.error('Error deleting país:', error);
      toast({
        title: 'Error',
        description: error.message || 'Error al eliminar el país',
        variant: 'destructive',
      });
    }
  };

  useEffect(() => {
    fetchPaises();
  }, []);

  const filteredPaises = paises.filter(pais =>
    pais.nombre_es.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pais.nombre_en.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pais.iso2.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pais.iso3.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pais.codigo.toString().includes(searchTerm)
  );

  return (
    <div className="container py-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Map className="h-6 w-6" />
            Gestión de Países
          </h1>
          <p className="text-gray-500">Administra la información de países</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus size={16} />
              Nuevo País
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>
                {selectedPais ? 'Editar País' : 'Agregar Nuevo País'}
              </DialogTitle>
            </DialogHeader>
            <PaisForm 
              pais={selectedPais} 
              onSuccess={() => {
                setIsDialogOpen(false);
                setSelectedPais(null);
                fetchPaises();
              }}
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <div className="flex justify-between items-center mb-4">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              type="text"
              placeholder="Buscar país..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div>
            <Button variant="outline" onClick={fetchPaises} disabled={loading}>
              <ArrowUpDown size={16} className="mr-2" />
              Actualizar
            </Button>
          </div>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre (ES)</TableHead>
                <TableHead>Nombre (EN)</TableHead>
                <TableHead>ISO2</TableHead>
                <TableHead>ISO3</TableHead>
                <TableHead>Código</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-4">
                    <div className="flex justify-center">
                      <div className="animate-spin h-6 w-6 border-4 border-sislog-primary border-t-transparent rounded-full"></div>
                    </div>
                  </TableCell>
                </TableRow>
              ) : filteredPaises.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-4">
                    No se encontraron países
                  </TableCell>
                </TableRow>
              ) : (
                filteredPaises.map((pais) => (
                  <TableRow key={pais.id}>
                    <TableCell className="font-medium">{pais.nombre_es}</TableCell>
                    <TableCell>{pais.nombre_en}</TableCell>
                    <TableCell>{pais.iso2}</TableCell>
                    <TableCell>{pais.iso3}</TableCell>
                    <TableCell>{pais.codigo}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        pais.estado === 'Activo' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {pais.estado || 'Activo'}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => {
                            setSelectedPais(pais);
                            setIsDialogOpen(true);
                          }}
                        >
                          <Pencil size={16} />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="outline" size="icon" className="text-red-500">
                              <Trash2 size={16} />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>¿Está seguro?</AlertDialogTitle>
                              <AlertDialogDescription>
                                Esta acción no se puede deshacer. Esto eliminará permanentemente el país {pais.nombre_es}.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancelar</AlertDialogCancel>
                              <AlertDialogAction
                                className="bg-red-500 text-white hover:bg-red-600"
                                onClick={() => handleDelete(pais.id)}
                              >
                                Eliminar
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default PaisesPage;

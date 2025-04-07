import React from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
interface TarifasHeaderProps {
  terceroNombre: string;
  onAddNew: () => void;
  loading: boolean;
}
const TarifasHeader: React.FC<TarifasHeaderProps> = ({
  terceroNombre,
  onAddNew,
  loading
}) => {
  return <>
      <div className="flex justify-between items-center mb-4">
        
        <Button onClick={onAddNew} disabled={loading} className="text-justify">
          <Plus className="mr-2 h-4 w-4" />
          Agregar Tarifa
        </Button>
      </div>
      <Separator className="my-4" />
    </>;
};
export default TarifasHeader;
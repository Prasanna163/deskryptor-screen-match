import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface Molecule {
  id: string;
  name: string;
  formula: string;
  mw: number;
  descriptors: any;
}

interface Complex {
  hbd_id: string;
  hba_id: string;
  ratio: string;
  efi_score: number;
  interaction_energy: number;
  complex_descriptors: any;
}

const MolecularSelector = () => {
  const [hbdList, setHbdList] = useState<Molecule[]>([]);
  const [hbaList, setHbaList] = useState<Molecule[]>([]);
  const [complexes, setComplexes] = useState<Complex[]>([]);
  const [selectedHbd, setSelectedHbd] = useState<string>('');
  const [selectedHba, setSelectedHba] = useState<string>('');
  const [compatibleHbas, setCompatibleHbas] = useState<Molecule[]>([]);
  const [compatibleHbds, setCompatibleHbds] = useState<Molecule[]>([]);
  const [currentComplex, setCurrentComplex] = useState<Complex | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [hbdResponse, hbaResponse, complexResponse] = await Promise.all([
          fetch('/assets/data/hbd.json'),
          fetch('/assets/data/hba.json'),
          fetch('/assets/data/complexes.json')
        ]);

        const hbdData = await hbdResponse.json();
        const hbaData = await hbaResponse.json();
        const complexData = await complexResponse.json();

        setHbdList(hbdData);
        setHbaList(hbaData);
        setComplexes(complexData);
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    if (selectedHbd && !selectedHba) {
      // Show compatible HBAs for selected HBD
      const compatible = complexes
        .filter(c => c.hbd_id === selectedHbd)
        .sort((a, b) => b.efi_score - a.efi_score)
        .map(c => hbaList.find(hba => hba.id === c.hba_id))
        .filter(Boolean) as Molecule[];
      setCompatibleHbas(compatible);
      setCompatibleHbds([]);
    } else if (selectedHba && !selectedHbd) {
      // Show compatible HBDs for selected HBA
      const compatible = complexes
        .filter(c => c.hba_id === selectedHba)
        .sort((a, b) => b.efi_score - a.efi_score)
        .map(c => hbdList.find(hbd => hbd.id === c.hbd_id))
        .filter(Boolean) as Molecule[];
      setCompatibleHbds(compatible);
      setCompatibleHbas([]);
    } else {
      setCompatibleHbas([]);
      setCompatibleHbds([]);
    }

    // Check for existing complex
    if (selectedHbd && selectedHba) {
      const complex = complexes.find(c => c.hbd_id === selectedHbd && c.hba_id === selectedHba);
      setCurrentComplex(complex || null);
    } else {
      setCurrentComplex(null);
    }
  }, [selectedHbd, selectedHba, complexes, hbdList, hbaList]);

  const selectedHbdData = hbdList.find(hbd => hbd.id === selectedHbd);
  const selectedHbaData = hbaList.find(hba => hba.id === selectedHba);

  const renderDescriptors = (descriptors: any, title: string) => (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle className="text-lg">{title} Descriptors</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.entries(descriptors).map(([key, value]) => (
            <div key={key} className="text-center">
              <p className="text-sm font-medium text-muted-foreground uppercase">{key}</p>
              <p className="text-lg font-bold text-primary">{typeof value === 'number' ? (value as number).toFixed(3) : String(value)}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Selector Section */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-accent">Hydrogen Bond Donor (HBD)</CardTitle>
          </CardHeader>
          <CardContent>
            <Select value={selectedHbd} onValueChange={setSelectedHbd}>
              <SelectTrigger>
                <SelectValue placeholder="Select HBD..." />
              </SelectTrigger>
              <SelectContent>
                {hbdList.map((hbd) => (
                  <SelectItem key={hbd.id} value={hbd.id}>
                    <div>
                      <div className="font-medium">{hbd.name}</div>
                      <div className="text-sm text-muted-foreground">{hbd.formula} (MW: {hbd.mw})</div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-accent">Hydrogen Bond Acceptor (HBA)</CardTitle>
          </CardHeader>
          <CardContent>
            <Select value={selectedHba} onValueChange={setSelectedHba}>
              <SelectTrigger>
                <SelectValue placeholder="Select HBA..." />
              </SelectTrigger>
              <SelectContent>
                {hbaList.map((hba) => (
                  <SelectItem key={hba.id} value={hba.id}>
                    <div>
                      <div className="font-medium">{hba.name}</div>
                      <div className="text-sm text-muted-foreground">{hba.formula} (MW: {hba.mw})</div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>
      </div>

      {/* Compatible Molecules Section */}
      {(compatibleHbas.length > 0 || compatibleHbds.length > 0) && (
        <Card>
          <CardHeader>
            <CardTitle className="text-primary">
              Compatible {compatibleHbas.length > 0 ? 'HBAs' : 'HBDs'} (Sorted by EFI Score)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {(compatibleHbas.length > 0 ? compatibleHbas : compatibleHbds).map((molecule, index) => {
                const complex = complexes.find(c => 
                  compatibleHbas.length > 0 
                    ? c.hbd_id === selectedHbd && c.hba_id === molecule.id
                    : c.hba_id === selectedHba && c.hbd_id === molecule.id
                );
                return (
                  <Badge 
                    key={molecule.id} 
                    variant="secondary" 
                    className="cursor-pointer hover:bg-accent hover:text-accent-foreground"
                    onClick={() => compatibleHbas.length > 0 ? setSelectedHba(molecule.id) : setSelectedHbd(molecule.id)}
                  >
                    {molecule.name} (EFI: {complex?.efi_score.toFixed(2)})
                  </Badge>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Selected Molecules Descriptors */}
      {selectedHbdData && renderDescriptors(selectedHbdData.descriptors, `${selectedHbdData.name} (HBD)`)}
      {selectedHbaData && renderDescriptors(selectedHbaData.descriptors, `${selectedHbaData.name} (HBA)`)}

      {/* Complex Results */}
      {selectedHbd && selectedHba && (
        <Card className="bg-gradient-subtle">
          <CardHeader>
            <CardTitle className="text-xl text-primary">Complex Analysis</CardTitle>
            <p className="text-muted-foreground">
              {selectedHbdData?.name} + {selectedHbaData?.name}
            </p>
          </CardHeader>
          <CardContent>
            {currentComplex ? (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-6 items-center">
                  <div className="text-center">
                    <p className="text-sm font-medium text-muted-foreground">EFI Score</p>
                    <p className="text-3xl font-bold text-accent">{currentComplex.efi_score.toFixed(2)}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium text-muted-foreground">Interaction Energy</p>
                    <p className="text-2xl font-bold text-primary">{currentComplex.interaction_energy.toFixed(1)} kJ/mol</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium text-muted-foreground">Ratio</p>
                    <p className="text-xl font-bold">{currentComplex.ratio}</p>
                  </div>
                </div>
                <Separator />
                {renderDescriptors(currentComplex.complex_descriptors, "Complex")}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-lg text-muted-foreground mb-4">
                  No complex data found for this combination.
                </p>
                <p className="text-sm text-accent">
                  Would you like to compute it and add to the database?
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default MolecularSelector;
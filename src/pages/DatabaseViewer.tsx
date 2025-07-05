import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Layout from '@/components/Layout';

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

const DatabaseViewer = () => {
  const [hbdList, setHbdList] = useState<Molecule[]>([]);
  const [hbaList, setHbaList] = useState<Molecule[]>([]);
  const [complexes, setComplexes] = useState<Complex[]>([]);
  const [loading, setLoading] = useState(true);

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
        setLoading(false);
      } catch (error) {
        console.error('Error loading data:', error);
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const exportToCSV = (data: any[], filename: string) => {
    if (data.length === 0) return;

    const headers = Object.keys(data[0]);
    const csvContent = [
      headers.join(','),
      ...data.map(row => 
        headers.map(header => {
          const value = row[header];
          if (typeof value === 'object') {
            return `"${JSON.stringify(value).replace(/"/g, '""')}"`;
          }
          return `"${value}"`;
        }).join(',')
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${filename}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-subtle flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl font-bold text-primary mb-4">Loading Database...</div>
          <div className="text-muted-foreground">Please wait while we fetch the molecular data</div>
        </div>
      </div>
    );
  }

  return (
    <Layout>
      <div className="py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-primary mb-4">Database Viewer</h1>
            <p className="text-xl text-muted-foreground">
              Comprehensive molecular database for DES screening
            </p>
          </div>

          <Tabs defaultValue="hbd" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="hbd" className="flex items-center gap-2">
                HBD Database
                <Badge variant="secondary">{hbdList.length}</Badge>
              </TabsTrigger>
              <TabsTrigger value="hba" className="flex items-center gap-2">
                HBA Database
                <Badge variant="secondary">{hbaList.length}</Badge>
              </TabsTrigger>
              <TabsTrigger value="complexes" className="flex items-center gap-2">
                Complexes
                <Badge variant="secondary">{complexes.length}</Badge>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="hbd">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-2xl text-accent">Hydrogen Bond Donors (HBD)</CardTitle>
                  <Button 
                    onClick={() => exportToCSV(hbdList, 'hbd_database')}
                    variant="outline"
                  >
                    Export CSV
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Formula</TableHead>
                          <TableHead>MW</TableHead>
                          <TableHead>HOMO</TableHead>
                          <TableHead>LUMO</TableHead>
                          <TableHead>Gap</TableHead>
                          <TableHead>Energy</TableHead>
                          <TableHead>Dipole</TableHead>
                          <TableHead>Volume</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {hbdList.map((hbd) => (
                          <TableRow key={hbd.id}>
                            <TableCell className="font-medium">{hbd.name}</TableCell>
                            <TableCell className="font-mono text-sm">{hbd.formula}</TableCell>
                            <TableCell>{hbd.mw}</TableCell>
                            <TableCell className="font-mono">{hbd.descriptors.homo.toFixed(3)}</TableCell>
                            <TableCell className="font-mono">{hbd.descriptors.lumo.toFixed(3)}</TableCell>
                            <TableCell className="font-mono">{hbd.descriptors.gap.toFixed(3)}</TableCell>
                            <TableCell className="font-mono">{hbd.descriptors.energy.toFixed(2)}</TableCell>
                            <TableCell className="font-mono">{hbd.descriptors.dipole.toFixed(1)}</TableCell>
                            <TableCell className="font-mono">{hbd.descriptors.volume.toFixed(1)}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="hba">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-2xl text-accent">Hydrogen Bond Acceptors (HBA)</CardTitle>
                  <Button 
                    onClick={() => exportToCSV(hbaList, 'hba_database')}
                    variant="outline"
                  >
                    Export CSV
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Formula</TableHead>
                          <TableHead>MW</TableHead>
                          <TableHead>HOMO</TableHead>
                          <TableHead>LUMO</TableHead>
                          <TableHead>Gap</TableHead>
                          <TableHead>Energy</TableHead>
                          <TableHead>Dipole</TableHead>
                          <TableHead>Volume</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {hbaList.map((hba) => (
                          <TableRow key={hba.id}>
                            <TableCell className="font-medium">{hba.name}</TableCell>
                            <TableCell className="font-mono text-sm">{hba.formula}</TableCell>
                            <TableCell>{hba.mw}</TableCell>
                            <TableCell className="font-mono">{hba.descriptors.homo.toFixed(3)}</TableCell>
                            <TableCell className="font-mono">{hba.descriptors.lumo.toFixed(3)}</TableCell>
                            <TableCell className="font-mono">{hba.descriptors.gap.toFixed(3)}</TableCell>
                            <TableCell className="font-mono">{hba.descriptors.energy.toFixed(2)}</TableCell>
                            <TableCell className="font-mono">{hba.descriptors.dipole.toFixed(1)}</TableCell>
                            <TableCell className="font-mono">{hba.descriptors.volume.toFixed(1)}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="complexes">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-2xl text-accent">DES Complexes</CardTitle>
                  <Button 
                    onClick={() => exportToCSV(
                      complexes.map(c => ({
                        ...c,
                        hbd_name: hbdList.find(h => h.id === c.hbd_id)?.name || c.hbd_id,
                        hba_name: hbaList.find(h => h.id === c.hba_id)?.name || c.hba_id
                      })), 
                      'complexes_database'
                    )}
                    variant="outline"
                  >
                    Export CSV
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>HBD</TableHead>
                          <TableHead>HBA</TableHead>
                          <TableHead>Ratio</TableHead>
                          <TableHead>EFI Score</TableHead>
                          <TableHead>ΔE (kJ/mol)</TableHead>
                          <TableHead>Complex HOMO</TableHead>
                          <TableHead>Complex LUMO</TableHead>
                          <TableHead>Complex Gap</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {complexes
                          .sort((a, b) => b.efi_score - a.efi_score)
                          .map((complex, index) => {
                            const hbd = hbdList.find(h => h.id === complex.hbd_id);
                            const hba = hbaList.find(h => h.id === complex.hba_id);
                            return (
                              <TableRow key={index}>
                                <TableCell className="font-medium">{hbd?.name || complex.hbd_id}</TableCell>
                                <TableCell className="font-medium">{hba?.name || complex.hba_id}</TableCell>
                                <TableCell className="font-mono">{complex.ratio}</TableCell>
                                <TableCell>
                                  <Badge 
                                    variant={complex.efi_score > 8 ? "default" : "secondary"}
                                    className={complex.efi_score > 8 ? "bg-accent text-accent-foreground" : ""}
                                  >
                                    {complex.efi_score.toFixed(2)}
                                  </Badge>
                                </TableCell>
                                <TableCell className="font-mono">{complex.interaction_energy.toFixed(1)}</TableCell>
                                <TableCell className="font-mono">{complex.complex_descriptors.homo.toFixed(3)}</TableCell>
                                <TableCell className="font-mono">{complex.complex_descriptors.lumo.toFixed(3)}</TableCell>
                                <TableCell className="font-mono">{complex.complex_descriptors.gap.toFixed(3)}</TableCell>
                              </TableRow>
                            );
                          })}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DatabaseViewer;
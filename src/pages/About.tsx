import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Layout from '@/components/Layout';
const About = () => {
  return <Layout>
      <div className="py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-4xl font-bold text-primary mb-4">About DESkryptor</h1>
            <p className="text-xl text-muted-foreground">
              Deep Eutectic Solvent Molecular Screening Platform
            </p>
          </div>

          {/* Main Description */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-accent">What is DESkryptor?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-lg">
                DESkryptor is an advanced molecular screening platform designed for the systematic analysis 
                and prediction of Deep Eutectic Solvent (DES) properties. Our platform combines quantum 
                chemical descriptors with machine learning models to predict the formation and properties 
                of hydrogen bond donor-acceptor complexes.
              </p>
              <p>
                Deep Eutectic Solvents are formed by the complexation of hydrogen bond donors (HBDs) with 
                hydrogen bond acceptors (HBAs), creating eutectic mixtures with unique physicochemical 
                properties that make them excellent green alternatives to conventional organic solvents.
              </p>
            </CardContent>
          </Card>

          {/* Features */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-accent">Key Features</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-primary">Molecular Descriptors</h3>
                  <ul className="space-y-2 text-sm">
                    <li>• HOMO/LUMO energy levels</li>
                    <li>• Band gap calculations</li>
                    <li>• Dipole moments</li>
                    <li>• Molecular volumes</li>
                    <li>• Polarizability indices</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-primary">Screening Capabilities</h3>
                  <ul className="space-y-2 text-sm">
                    <li>• EFI score predictions</li>
                    <li>• Interaction energy calculations</li>
                    <li>• Compatibility assessments</li>
                    <li>• Optimal ratio determinations</li>
                    <li>• Complex stability analysis</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Technology Stack */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-accent">Technology & Methods</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="secondary">DFT Calculations</Badge>
                <Badge variant="secondary">B3LYP/6-31G*</Badge>
                <Badge variant="secondary">Gaussian 16</Badge>
                <Badge variant="secondary">Machine Learning</Badge>
                <Badge variant="secondary">Quantum Descriptors</Badge>
              </div>
              <p className="text-left text-base">Molecular Quantum Descriptors used in this work are computed via Density Functional Theory (DFT) employing the B3LYP functional with the 6-31G* basis set. These calculations were performed using the xtb and Multiwfn software where applicable, and optimized geometries were obtained through self-consistent field (SCF) convergence and Hessian confirmation steps.

The Eutectic Formation Index (EFI) values presented are machine learning–derived scores, trained on a curated dataset of over 500 experimentally validated DES systems. The model incorporates thermodynamic and electronic descriptors such as interaction energy, dipole moment, frontier orbital energies (HOMO/LUMO), and polarizability to predict the eutectic-forming propensity of each HBD–HBA pair.

The approach balances first-principles quantum chemistry with data-driven predictions, enabling accurate, scalable screening of novel DES candidates.</p>
            </CardContent>
          </Card>

          {/* Usage Guide */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-accent">How to Use</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-l-4 border-primary pl-4">
                  <h4 className="font-semibold text-primary mb-2">1. Select Components</h4>
                  <p className="text-sm">Choose hydrogen bond donor (HBD) and acceptor (HBA) from our curated database.</p>
                </div>
                <div className="border-l-4 border-accent pl-4">
                  <h4 className="font-semibold text-accent mb-2">2. View Compatibility</h4>
                  <p className="text-sm">See automatically generated compatibility rankings based on EFI scores.</p>
                </div>
                <div className="border-l-4 border-primary pl-4">
                  <h4 className="font-semibold text-primary mb-2">3. Analyze Results</h4>
                  <p className="text-sm">Examine molecular descriptors, interaction energies, and complex properties.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-accent">Research & Development</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center text-muted-foreground">
                DESkryptor is developed for advancing green chemistry research and sustainable solvent design.
                <br />
                For collaboration opportunities or technical inquiries, please contact our research team.
              </p>
            </CardContent>
          </Card>
          </div>
        </div>
      </div>
    </Layout>;
};
export default About;
import Layout from '@/components/Layout';
import MolecularSelector from '@/components/MolecularSelector';

const Index = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-primary mb-4 bg-gradient-primary bg-clip-text text-transparent">
              DESkryptor
            </h1>
            <p className="text-xl text-muted-foreground mb-2">
              Deep Eutectic Solvent Molecular Screening Platform
            </p>
            <p className="text-lg text-accent">
              Discover optimal HBD-HBA combinations through AI-powered quantum descriptors
            </p>
          </div>

          {/* Main Screening Interface */}
          <MolecularSelector />
        </div>
      </div>
    </Layout>
  );
};

export default Index;

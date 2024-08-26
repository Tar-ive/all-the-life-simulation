import React, { useState, useCallback, useRef } from 'react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { CardContent } from '@/components/ui/CardContent';
import { CardHeader } from '@/components/ui/CardHeader';

const numRows = 20;
const numCols = 20;
const operations = [
  [0, 1], [0, -1], [1, -1], [-1, 1],
  [1, 1], [-1, -1], [1, 0], [-1, 0],
];

const generateEmptyGrid = () => {
  return Array.from({ length: numRows }, () => Array(numCols).fill(0));
};

const companyTypes = ['🏢', '🏭', '🏦', '🏪'];
const companyColors = {
  '🏢': '#bfdbfe', // blue-200
  '🏭': '#fecaca', // red-200
  '🏦': '#fef08a', // yellow-200
  '🏪': '#bbf7d0', // green-200
};

const BusinessEcosystemSimulator = () => {
  const [grid, setGrid] = useState(generateEmptyGrid);
  const [running, setRunning] = useState(false);
  const [generation, setGeneration] = useState(0);
  const runningRef = useRef(running);
  runningRef.current = running;

  const runSimulation = useCallback(() => {
    if (!runningRef.current) {
      return;
    }
    setGrid((g) => {
      return g.map((row, i) =>
        row.map((cell, j) => {
          let neighbors = 0;
          operations.forEach(([x, y]) => {
            const newI = i + x;
            const newJ = j + y;
            if (newI >= 0 && newI < numRows && newJ >= 0 && newJ < numCols) {
              neighbors += g[newI][newJ] ? 1 : 0;
            }
          });
          if (neighbors < 2 || neighbors > 3) {
            return 0;
          } else if (cell === 0 && neighbors === 3) {
            return companyTypes[Math.floor(Math.random() * companyTypes.length)];
          } else {
            return cell;
          }
        })
      );
    });
    setGeneration(gen => gen + 1);
    setTimeout(runSimulation, 500);
  }, []);

  const rulesExplanation = `
    Simulation Rules:
    1. Each cell represents a potential business opportunity.
    2. Filled cells (with emojis) are active businesses.
    3. Empty cells are untapped opportunities.
    4. For each generation:
       - A business with fewer than 2 neighboring businesses will fail (underpopulation).
       - A business with 2 or 3 neighboring businesses will thrive.
       - A business with more than 3 neighboring businesses will fail (overcrowding).
       - An empty cell with exactly 3 neighboring businesses will spawn a new business.
    
    Significance of the Simulation:
    This simulation models the dynamics of a business ecosystem, illustrating concepts such as:
    - Market Saturation: Too many businesses in one area can lead to failure.
    - Synergy: Businesses can thrive when they have the right amount of competition and cooperation.
    - Innovation: New businesses emerge in areas with the right balance of existing activity.
    - Economic Cycles: The simulation may show patterns of growth, decline, and regeneration.
    - Clustering: Successful business areas may form and persist over time.
    
    While simplified, this model helps visualize complex economic principles and can be used to explore
    theories about business development, urban planning, and economic policy.
  `;

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      padding: '2rem',
      backgroundColor: '#d1fae5',
      fontFamily: '"Courier New", Courier, monospace',
    }}>
      <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1rem', color: '#065f46' }}>
        Business Ecosystem Simulator
      </h1>
      <p style={{ fontSize: '1rem', marginBottom: '2rem', maxWidth: '800px', textAlign: 'center', color: '#047857' }}>
        Welcome to the Business Ecosystem Simulator! Each cell represents a potential business opportunity. 
        Watch as businesses emerge, thrive, or fail based on their surroundings. Click cells to add or remove businesses, 
        then start the simulation to see how the ecosystem evolves over time.
      </p>
      <div style={{ display: 'flex', width: '100%', maxWidth: '1200px', gap: '2rem' }}>
        <div style={{ 
          flex: 2, 
          aspectRatio: '1/1', 
          border: '2px solid #065f46', 
          borderRadius: '8px', 
          overflow: 'hidden',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${numCols}, 1fr)`,
            gap: '1px',
            width: '95%',
            height: '95%',
          }}>
            {grid.map((rows, i) =>
              rows.map((col, k) => (
                <div
                  key={`${i}-${k}`}
                  onClick={() => {
                    const newGrid = [...grid];
                    newGrid[i][k] = grid[i][k] ? 0 : companyTypes[Math.floor(Math.random() * companyTypes.length)];
                    setGrid(newGrid);
                  }}
                  style={{
                    backgroundColor: grid[i][k] ? companyColors[grid[i][k]] : 'white',
                    border: '1px solid #6ee7b7',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.2rem',
                    cursor: 'pointer',
                  }}
                >
                  {grid[i][k] || ''}
                </div>
              ))
            )}
          </div>
        </div>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <Card style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
            <CardHeader>Ecosystem Health</CardHeader>
            <CardContent>
              <div>Active Businesses: {grid.flat().filter(cell => cell !== 0).length}</div>
              <div>Total Opportunities: {numRows * numCols}</div>
              <div>Generation: {generation}</div>
            </CardContent>
          </Card>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <WavyButton
              onClick={() => {
                setRunning(!running);
                if (!running) {
                  runningRef.current = true;
                  runSimulation();
                }
              }}
            >
              {running ? 'Stop' : 'Start'} Simulation
            </WavyButton>
            <WavyButton
              onClick={() => {
                setGrid(generateEmptyGrid());
                setGeneration(0);
              }}
            >
              Clear Grid
            </WavyButton>
            <WavyButton
              onClick={() => {
                const rows = [];
                for (let i = 0; i < numRows; i++) {
                  rows.push(
                    Array.from(Array(numCols), () => (Math.random() > 0.7 ? companyTypes[Math.floor(Math.random() * companyTypes.length)] : 0))
                  );
                }
                setGrid(rows);
                setGeneration(0);
              }}
            >
              Randomize
            </WavyButton>
          </div>
          <Card style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
            <CardHeader>How to Play</CardHeader>
            <CardContent>
              <ul style={{ listStyleType: 'disc', paddingLeft: '1rem' }}>
                <li>Click on cells to add or remove businesses</li>
                <li>Press 'Start Simulation' to watch the ecosystem evolve</li>
                <li>Use 'Clear Grid' to start over</li>
                <li>'Randomize' for a quick start with random businesses</li>
              </ul>
            </CardContent>
          </Card>
          <Card style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
            <CardHeader>Simulation Rules and Significance</CardHeader>
            <CardContent>
              <pre style={{ 
                whiteSpace: 'pre-wrap', 
                wordWrap: 'break-word',
                fontFamily: 'inherit',
                fontSize: '0.9rem',
                lineHeight: '1.4'
              }}>
                {rulesExplanation}
              </pre>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

const WavyButton = ({ children, onClick }) => {
  return (
    <button
      onClick={onClick}
      style={{
        position: 'relative',
        display: 'inline-block',
        padding: '12px 24px',
        color: '#fff',
        backgroundColor: '#333',
        border: 'none',
        borderRadius: '5px',
        fontSize: '16px',
        cursor: 'pointer',
        overflow: 'hidden',
        transition: 'background-color 0.3s',
      }}
    >
      <span style={{ position: 'relative', zIndex: 1 }}>{children}</span>
      <svg
        style={{
          position: 'absolute',
          top: '0',
          left: '0',
          width: '100%',
          height: '100%',
        }}
        viewBox="0 0 200 60"
        preserveAspectRatio="none"
      >
        <path
          d="M0,50 Q50,30 100,50 T200,50 V60 H0 Z"
          fill="#555"
        />
      </svg>
    </button>
  );
};

export default BusinessEcosystemSimulator;
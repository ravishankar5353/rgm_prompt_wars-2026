import React, { useState } from 'react';
import { GitFork, Sparkles, Layers, Info, CheckCircle2 } from 'lucide-react';
import { InterestGraphData, InterestGraphNode } from '../../types/analysis';

export const InteractiveInterestGraph: React.FC<{ graphData: InterestGraphData }> = ({ graphData }) => {
  const [selectedNode, setSelectedNode] = useState<InterestGraphNode | null>(
    graphData.nodes.find((n) => n.level === 1) || graphData.nodes[0]
  );

  const getNodeColor = (level: number, active?: boolean) => {
    if (!active) return '#64748b';
    switch (level) {
      case 0: return '#6366f1'; // Root
      case 1: return '#8b5cf6'; // Domain
      case 2: return '#06b6d4'; // Subdomain
      case 3: return '#10b981'; // Concept
      default: return '#f59e0b';
    }
  };

  return (
    <div
      className="glass-card"
      style={{
        padding: '24px',
        border: '1px solid var(--border-glass)',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <GitFork size={18} color="var(--accent-primary)" />
          <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-primary)' }}>
            INTERACTIVE INTEREST GRAPH
          </h3>
        </div>
        <span className="badge" style={{ background: 'rgba(255, 255, 255, 0.06)', color: 'var(--text-secondary)' }}>
          Click nodes to inspect semantic connections
        </span>
      </div>

      {/* SVG Interactive Hierarchy Graph */}
      <div
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.06) 0%, rgba(0, 0, 0, 0.4) 100%)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-subtle)',
          padding: '24px 16px',
          minHeight: '340px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-around',
          gap: '24px',
          position: 'relative',
        }}
      >
        {/* Level 0: Root */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          {graphData.nodes
            .filter((n) => n.level === 0)
            .map((node) => (
              <button
                key={node.id}
                onClick={() => setSelectedNode(node)}
                style={{
                  padding: '8px 20px',
                  borderRadius: 'var(--radius-pill)',
                  background: selectedNode?.id === node.id ? 'var(--accent-primary)' : 'rgba(99, 102, 241, 0.2)',
                  border: `2px solid ${getNodeColor(node.level, node.active)}`,
                  color: 'white',
                  fontWeight: 700,
                  fontSize: '0.88rem',
                  cursor: 'pointer',
                  boxShadow: 'var(--shadow-glow)',
                  transition: 'all 0.2s ease',
                }}
              >
                🌐 {node.name}
              </button>
            ))}
        </div>

        <div style={{ width: '2px', height: '20px', background: 'var(--border-glass)' }} />

        {/* Level 1: Core Domain */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
          {graphData.nodes
            .filter((n) => n.level === 1)
            .map((node) => (
              <button
                key={node.id}
                onClick={() => setSelectedNode(node)}
                style={{
                  padding: '10px 24px',
                  borderRadius: 'var(--radius-pill)',
                  background: selectedNode?.id === node.id ? 'var(--accent-secondary)' : 'rgba(139, 92, 246, 0.25)',
                  border: `2px solid ${getNodeColor(node.level, node.active)}`,
                  color: 'white',
                  fontWeight: 800,
                  fontSize: '0.92rem',
                  cursor: 'pointer',
                  boxShadow: '0 0 20px rgba(139, 92, 246, 0.3)',
                  transition: 'all 0.2s ease',
                }}
              >
                ⚡ {node.name} ({node.confidence}%)
              </button>
            ))}
        </div>

        <div style={{ width: '2px', height: '20px', background: 'var(--border-glass)' }} />

        {/* Level 2: Subdomains */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
          {graphData.nodes
            .filter((n) => n.level === 2)
            .map((node) => (
              <button
                key={node.id}
                onClick={() => setSelectedNode(node)}
                style={{
                  padding: '7px 16px',
                  borderRadius: 'var(--radius-pill)',
                  background: selectedNode?.id === node.id ? 'var(--accent-cyan)' : 'rgba(6, 182, 212, 0.15)',
                  border: `1.5px solid ${getNodeColor(node.level, node.active)}`,
                  color: selectedNode?.id === node.id ? 'black' : '#cffafe',
                  fontWeight: 700,
                  fontSize: '0.82rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                🔹 {node.name}
              </button>
            ))}
        </div>

        {/* Level 3: Concepts */}
        {graphData.nodes.some((n) => n.level === 3) && (
          <>
            <div style={{ width: '2px', height: '16px', background: 'var(--border-glass)' }} />
            <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap' }}>
              {graphData.nodes
                .filter((n) => n.level === 3)
                .map((node) => (
                  <button
                    key={node.id}
                    onClick={() => setSelectedNode(node)}
                    style={{
                      padding: '5px 14px',
                      borderRadius: 'var(--radius-pill)',
                      background: selectedNode?.id === node.id ? 'var(--accent-emerald)' : 'rgba(16, 185, 129, 0.12)',
                      border: `1px solid ${getNodeColor(node.level, node.active)}`,
                      color: selectedNode?.id === node.id ? 'black' : '#a7f3d0',
                      fontWeight: 600,
                      fontSize: '0.78rem',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    • {node.name}
                  </button>
                ))}
            </div>
          </>
        )}
      </div>

      {/* Selected Node Details Card */}
      {selectedNode && (
        <div
          style={{
            background: 'rgba(0, 0, 0, 0.3)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-md)',
            padding: '14px 18px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '10px',
          }}
        >
          <div>
            <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 700 }}>
              Selected Interest Node:
            </div>
            <div style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              {selectedNode.name} ({selectedNode.category})
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
              Confidence Weight: <strong>{selectedNode.confidence}%</strong>
            </span>
            <span
              className="badge"
              style={{
                background: selectedNode.active ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255, 255, 255, 0.08)',
                color: selectedNode.active ? '#34d399' : 'var(--text-muted)',
              }}
            >
              {selectedNode.active ? 'Active Focus' : 'Adjacent Horizon'}
            </span>
          </div>
        </div>
      )}

      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
        <Info size={12} />
        <span>Hierarchy is mathematically synthesized from actual multi-signal reel analysis.</span>
      </div>
    </div>
  );
};

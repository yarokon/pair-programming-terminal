import { useEffect, useState } from 'react';
import { provider } from './collaboration.ts';

type User = {
  clientId: number;
  name: string;
  color: string;
};

type AwarenessState = {
  user?: {
    name: string;
    color: string;
  };
};

export function UsersList() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const awareness = provider.awareness;

    const updateUsers = () => {
      const awareness = provider.awareness;

      const users: User[] = [];

      for (const [clientId, state] of awareness.getStates() as Map<number, AwarenessState>) {
        if (!state.user) continue;

        users.push({
          clientId,
          name: state.user.name,
          color: state.user.color,
        });
      }

      setUsers(users);
    };

    awareness.on('change', updateUsers);
    updateUsers();

    return () => {
      awareness.off('change', updateUsers);
    };
  }, []);

  return (
    <div
      style={{
        display: 'flex',
        gap: 8,
        alignItems: 'center',
        flexWrap: 'wrap',
      }}
    >
      {users.map((user) => (
        <div
          key={user.clientId}
          style={{
            padding: '4px 8px',
            borderRadius: 6,
            background: user.color,
            color: '#fff',
            fontSize: 12,
          }}
        >
          {user.name}
        </div>
      ))}
    </div>
  );
}

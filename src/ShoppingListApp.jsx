import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Trash } from "lucide-react";

export default function ShoppingListApp() {
    const [lists, setLists] = useState([]);
    const [newListName, setNewListName] = useState("");

    const addList = () => {
        if (newListName.trim() === "") return;
        setLists([...lists, { name: newListName, items: [] }]);
        setNewListName("");
    };

    const addItem = (listIndex, itemName, quantity, price) => {
        if (itemName.trim() === "") return;
        const updatedLists = [...lists];
        updatedLists[listIndex].items.push({ name: itemName, quantity, price, bought: false });
        setLists(updatedLists);
    };

    const toggleBought = (listIndex, itemIndex) => {
        const updatedLists = [...lists];
        updatedLists[listIndex].items[itemIndex].bought = !updatedLists[listIndex].items[itemIndex].bought;
        setLists(updatedLists);
    };

    const deleteList = (index) => {
        setLists(lists.filter((_, i) => i !== index));
    };

    return (
        <div className="p-6 max-w-2xl mx-auto space-y-4">
            <h1 className="text-2xl font-bold">Gestion des listes de courses</h1>
            <div className="flex gap-2">
                <Input
                    placeholder="Nom de la liste"
                    value={newListName}
                    onChange={(e) => setNewListName(e.target.value)}
                />
                <Button onClick={addList}><Plus /></Button>
            </div>
            {lists.map((list, listIndex) => (
                <Card key={listIndex} className="p-4">
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-semibold">{list.name}</h2>
                        <Button variant="destructive" size="icon" onClick={() => deleteList(listIndex)}>
                            <Trash size={16} />
                        </Button>
                    </div>
                    <div className="mt-2 space-y-2">
                        {list.items.map((item, itemIndex) => (
                            <div key={itemIndex} className="flex justify-between items-center border p-2 rounded">
                                <Checkbox checked={item.bought} onCheckedChange={() => toggleBought(listIndex, itemIndex)} />
                                <span className={item.bought ? "line-through" : ""}>{item.name} - {item.quantity}x (€{item.price})</span>
                            </div>
                        ))}
                        <AddItemForm onAdd={(name, qty, price) => addItem(listIndex, name, qty, price)} />
                    </div>
                </Card>
            ))}
        </div>
    );
}

function AddItemForm({ onAdd }) {
    const [itemName, setItemName] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [price, setPrice] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        onAdd(itemName, quantity, price);
        setItemName("");
        setQuantity(1);
        setPrice("");
    };

    return (
        <form onSubmit={handleSubmit} className="flex gap-2 mt-2">
            <Input placeholder="Produit" value={itemName} onChange={(e) => setItemName(e.target.value)} required />
            <Input type="number" placeholder="Qté" value={quantity} onChange={(e) => setQuantity(e.target.value)} required min="1" />
            <Input type="number" placeholder="Prix" value={price} onChange={(e) => setPrice(e.target.value)} required min="0" step="0.01" />
            <Button type="submit"><Plus /></Button>
        </form>
    );
}

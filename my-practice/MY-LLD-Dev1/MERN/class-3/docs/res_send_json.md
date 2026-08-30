`res.send()` and `res.json()` both send an HTTP response in Express, but they signal different intent.

- `res.send(data)` sends various response types: text, HTML, a Buffer, or an object.
- `res.json(data)` specifically sends JSON and sets `Content-Type: application/json`.

```js
app.get("/text", (req, res) => {
  res.send("Hello");
});

app.get("/html", (req, res) => {
  res.send("<h1>Hello</h1>");
});

app.get("/user", (req, res) => {
  res.json({ id: 1, name: "Chinu" });
});
```

For objects and arrays, Express generally serializes both as JSON:

```js
res.send({ name: "Chinu" });
res.json({ name: "Chinu" });
```

But prefer `res.json()` for API data because it is explicit and reliably communicates that the endpoint returns JSON. Use `res.send()` for plain text, HTML, or other non-JSON content.
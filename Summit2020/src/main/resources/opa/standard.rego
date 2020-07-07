package http.authz

default allow = false

allow {
  input.method == "GET"
  input.path = ["api","v1", "inspect", "username"]
}

allow {
  input.method == "GET"
  input.path = ["api","v1", "inspect", "roles"]
  is_authenticated

  authorities := input.auth.principal.claims.resource_access.spav4.roles
  authorities[_] == "voter-user"
}

allow {
  input.method == "GET"
  input.path = ["api","v1", "inspect", "authentication"]
  is_authenticated
  authorities := input.auth.principal.claims.resource_access.spav4.roles
  authorities[_] == "voter-user"
}

allow {
  input.method == "GET"
  input.path = ["api","v1", "public", "vote", "results"]
}

allow {
  input.method == "GET"
  some username
  input.path = ["api","v1", "vote", username ]
  is_authenticated
  authorities := input.auth.principal.claims.resource_access.spav4.roles
  authorities[_] == "voter-user"
  input.auth.principal.claims.preferred_username == username
}

allow {
  input.method == "GET"
  input.path = ["api","v1", "vote"]
  is_authenticated
  authorities := input.auth.principal.claims.resource_access.spav4.roles
  authorities[_] == "voter-admin"
}

allow {
  input.method == "POST"
  input.path = ["api","v1", "vote"]
  is_authenticated
  authorities := input.auth.principal.claims.resource_access.spav4.roles
  authorities[_] == "voter-user"
}

allow {
  input.method == "POST"
  input.path = ["api","v1", "vote", "action", "reset"]
  is_authenticated
  authorities := input.auth.principal.claims.resource_access.spav4.roles
  authorities[_] == "voter-admin"
}

is_authenticated { input.auth.authenticated == true }
